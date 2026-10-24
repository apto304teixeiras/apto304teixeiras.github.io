(function () {
  "use strict";
  var S = window.SITE || {};
  var isSet = function (v, ph) { return typeof v === "string" && v !== "" && v !== ph; };

  // Google tag: só carrega se o GTAG_ID foi configurado.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  if (isSet(S.GTAG_ID, "GTAG" + "_ID")) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.GTAG_ID);
    document.head.appendChild(g);
    window.gtag("js", new Date());
    window.gtag("config", S.GTAG_ID);
  }

  // Evento + conversão opcional do Google Ads.
  window.track = function (name, params, convLabel) {
    params = params || {};
    params.transport_type = "beacon";
    window.gtag("event", name, params);
    if (isSet(convLabel, "") && isSet(S.GTAG_ID, "GTAG" + "_ID")) {
      window.gtag("event", "conversion", { send_to: S.GTAG_ID + "/" + convLabel, transport_type: "beacon" });
    }
  };

  // Lê e limpa o código de origem (?origem=G1). Só letras, números e hífen.
  window.getOrigem = function () {
    var o = new URLSearchParams(location.search).get("origem") || "";
    o = o.replace(/[^A-Za-z0-9-]/g, "").slice(0, 12);
    return o || "DIR";
  };

  // Ano no rodapé.
  document.addEventListener("DOMContentLoaded", function () {
    var y = document.getElementById("ano");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
