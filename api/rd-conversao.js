// Função serverless (Vercel) — recebe o formulário da LP e registra a conversão
// no RD Station Marketing via API de Conversão (API Key).
//
// Variáveis de ambiente (configure no Vercel → Settings → Environment Variables):
//   RD_API_KEY                 (obrigatória) API Key do RD Station
//   RD_CONVERSION_IDENTIFIER   (opcional) identificador da conversão. Padrão: lp-consultoria-suk
//   RD_CF_TIME_DEV             (opcional) identificador do campo personalizado "time de
//                              desenvolvimento próprio" no RD (ex.: cf_time_de_desenvolvimento_proprio)

module.exports = async function handler(req, res) {
  // Checagem temporária de configuração (não expõe a API Key)
  if (req.method === "GET") {
    if (req.query && req.query.diag === "1") {
      res.status(200).json({
        ok: true,
        env: {
          RD_API_KEY: !!process.env.RD_API_KEY,
          RD_CONVERSION_IDENTIFIER: process.env.RD_CONVERSION_IDENTIFIER || null,
          RD_CF_TIME_DEV: process.env.RD_CF_TIME_DEV || null,
        },
      });
      return;
    }
    res.status(405).json({ ok: false, error: "Método não permitido" });
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método não permitido" });
    return;
  }

  const apiKey = process.env.RD_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: "RD_API_KEY não configurada no servidor" });
    return;
  }

  const identifier = process.env.RD_CONVERSION_IDENTIFIER || "lp-consultoria-suk";
  const cfTimeDev = process.env.RD_CF_TIME_DEV; // opcional

  // corpo (Vercel já faz o parse de JSON em req.body)
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  body = body || {};

  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const email = str(body.email);
  if (!email) {
    res.status(400).json({ ok: false, error: "E-mail é obrigatório" });
    return;
  }

  const timeDev = str(body.time_dev); // "Sim" | "Não"
  const tags = ["consultoria-suk"];
  if (timeDev) {
    tags.push("time-dev-proprio:" + (timeDev.toLowerCase().indexOf("s") === 0 ? "sim" : "nao"));
  }

  const payload = {
    conversion_identifier: identifier,
    email: email,
    available_for_mailing: true,
    tags: tags,
  };
  const name = str(body.nome);            if (name) payload.name = name;
  const company = str(body.empresa);      if (company) payload.company_name = company;
  const jobTitle = str(body.cargo);       if (jobTitle) payload.job_title = jobTitle;
  const phone = str(body.telefone);       if (phone) payload.mobile_phone = phone;
  if (cfTimeDev && timeDev) payload[cfTimeDev] = timeDev;

  // Base legal (LGPD) quando o contato autorizou o contato
  if (body.lgpd) {
    payload.legal_bases = [
      { category: "communications", type: "consent", status: "granted" },
    ];
  }

  try {
    const rdRes = await fetch(
      "https://api.rd.services/platform/conversions?api_key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: "CONVERSION", event_family: "CDP", payload: payload }),
      }
    );
    const text = await rdRes.text();
    if (!rdRes.ok) {
      console.error("RD Station erro", rdRes.status, text);
      res.status(502).json({
        ok: false,
        error: "Falha ao registrar a conversão no RD Station",
        status: rdRes.status,
        detail: text.slice(0, 600),
      });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro de conexão com o RD Station", err);
    res.status(500).json({ ok: false, error: "Erro de conexão com o RD Station" });
  }
};
