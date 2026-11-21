/*
  SPONSORS & AFFILIATES: edit this file only.
  Two lists below: SPONSORS and AFFILIATES. Each entry becomes a card in
  "As Heard on the Kyle Seraphin Show". Order here = order on the page.

    name     : company name
    blurb    : one or two short lines
    code     : promo code, or "" if the link itself carries the discount
    url      : the exact link to use
    logo     : path to logo in assets/sponsors/ ("" = text monogram tile)
    monogram : letters shown when there's no logo (e.g. "UT")
    tile     : "dark" (default) or "light" (white tile behind dark logos)
    wide     : true for wide wordmark logos
    cta      : button text (optional, default "Shop now")

  Last updated: Nov 2026 (also change SPONSORS_UPDATED below)
*/
window.SPONSORS_UPDATED = "Nov 2026";

window.SPONSORS = [
  { name: "Patriot Protect", code: "KYLE", url: "https://patriot-protect.com/KYLE",
    blurb: "15% off all annual services. Protect yourself from scams and identity theft.",
    logo: "assets/sponsors/patriot-protect.png" },
  { name: "SLNT", code: "", url: "https://slnt.com/KYLE",
    blurb: "Save 15%. Check out the Concealed Carry Sling Bag or E3 Faraday Backpack.",
    logo: "assets/sponsors/slnt.png" },
  { name: "CovePure", code: "", url: "https://covepure.com/kyle",
    blurb: "Save on their no-plumbing countertop water filtration units.",
    logo: "assets/sponsors/covepure.png", tile: "light", wide: true },
  { name: "UnderTac", code: "KYLE20", url: "https://undertac.com/",
    blurb: "20% off sitewide. Check out the Infantry Boxer Brief.",
    logo: "", monogram: "UT" },
  { name: "Heavy Barrel Shampoo", code: "", url: "https://heavybarrelshampoo.com/Kyle",
    blurb: "American-made 2-in-1 shampoo with no artificial fragrances.",
    logo: "assets/sponsors/heavy-barrel.png" }
];

window.AFFILIATES = [
  { name: "SecureIt Gun Storage", code: "", url: "https://www.secureitgunstorage.com/?utm_source=Partner&utm_medium=Referral&utm_campaign=Kyle_Seraphin",
    blurb: "I've used the Agile gun safe systems for over 6 years and 5 different home moves.",
    logo: "assets/sponsors/secureit.svg", wide: true },
  { name: "Shield Arms", code: "KYLE", url: "https://shieldarms.com/",
    blurb: "Save 10% on high-capacity flush-fit Glock mags, folding AR-15 lowers, and Montana-built rifles and pistol-caliber carbines.",
    logo: "assets/sponsors/shield-arms.png", tile: "light" },
  { name: "Replicator USA", code: "KYLE", url: "https://www.replicatorusa.com/",
    blurb: "Save 10%. I'm running the Ventus K on my favorite Geissele AR-15 and the ACER on a premium .22 LR rifle.",
    logo: "assets/sponsors/replicator-usa.svg", wide: true },
  { name: "MattHat Jerky", code: "", url: "https://matthatjerky.com/Kyle",
    blurb: "The Seraphin house's favorite beef jerky. Try Roasted Garlic and Black Truffle.",
    logo: "assets/sponsors/matthat-jerky.png", wide: true }
];
