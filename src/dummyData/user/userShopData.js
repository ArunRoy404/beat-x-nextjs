import { userShopAssets } from "./userShopAssets"

export const shopHero = {
  badge: "ARTIST SPOTLIGHT",
  titleLine1: "THE NEON",
  titleLine2: "COLLECTION",
  description:
    "Limited edition apparel and premium vinyl pressings from the Zenith world tour. Refracting sound into style.",
  artwork: null,
  placeholderIcon: "disc",
}

export const shopCategories = ["All Items", "Limited Vinyl", "Streetwear", "Audio Tech", "Accessories", "Posters"]

export const products = [
  {
    id: "sonic-fabric-hoodie",
    name: "Prism Core Hoodie",
    tagline: "Heavyweight 450gsm Cotton • Zenith Tour Edit",
    thumbnail: userShopAssets.products.prismCoreHoodie,
    price: "৳129.00",
    badge: { label: "LIMITED STOCK", tone: "red" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "quickAdd" },
    detail: {
      model: "Model: BP-24 Prism",
      badge: { label: "LIMITED DROP", tone: "lime" },
      name: "Sonic Fabric Tech Oversized Hoodie",
      price: "৳249.00",
      originalPrice: "৳310.00",
      images: [
        userShopAssets.detail.hoodieMain,
        userShopAssets.detail.hoodieThumb1,
        userShopAssets.detail.hoodieThumb2,
        userShopAssets.detail.hoodieThumb3,
      ],
      colors: [
        { hex: "#0e0e0e", label: "Void Black" },
        { hex: "#6b6b6b", label: "Slate Grey" },
        { hex: "#006877", label: "Deep Teal" },
      ],
      defaultColorIndex: 0,
      sizes: ["S", "M", "L", "XL"],
      defaultSize: "L",
      techSpec: {
        title: "Sonic Fabric™ Technology",
        description:
          "Woven with acoustic-reactive filaments that dampen ambient noise by 12dB while preserving high-fidelity audio pass-through for synced wearables.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "The Architecture of Sound & Style",
        body: "The Prism Series represents our most advanced garment engineering yet, blurring the line between wearable tech and high-fashion editorial aesthetics.",
      },
      features: [
        {
          title: "Acoustic Ergonomics",
          description:
            "Strategically placed sonic vents allow for natural air circulation without compromising the noise-dampening properties of the Sonic Fabric™ core.",
          image: userShopAssets.detail.acousticErgonomics,
        },
        {
          title: "Hydro-Resist Shell",
          description:
            "Nanoscopic coating that repels liquids while maintaining total breathability for high-performance urban exploration.",
          stat: "10,000mm Rating",
          icon: "droplet",
        },
      ],
    },
  },
  {
    id: "electric-echo-lp",
    name: "Electric Echo LP",
    tagline: "Limited Edition 180g Cyan Swirl Vinyl",
    thumbnail: null,
    placeholderIcon: "disc",
    price: "৳129.00",
    badge: { label: "LIMITED STOCK", tone: "red" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "authentic" },
    detail: {
      model: "Model: VL-24 Echo",
      badge: { label: "LIMITED DROP" },
      name: "Electric Echo LP — 180g Cyan Swirl Vinyl",
      price: "৳189.00",
      originalPrice: "৳230.00",
      images: [null],
      colors: [
        { hex: "#0e0e0e", label: "Obsidian Sleeve" },
        { hex: "#cc97ff", label: "Violet Swirl" },
        { hex: "#3adffa", label: "Cyan Swirl" },
      ],
      defaultColorIndex: 2,
      techSpec: {
        icon: "disc",
        title: "180g Audiophile Pressing",
        description:
          "Cut at half-speed from the original analog masters for a warmer, wider soundstage with tighter low-end control.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "Pressed For The Purists",
        body: "Mastered from the original analog tapes and hand-numbered for collectors who hear every layer of the mix.",
      },
      features: [
        {
          title: "Half-Speed Mastering",
          description:
            "Cut at half the playback speed to capture more high-frequency detail and a tighter low end.",
          image: null,
          icon: "disc",
        },
        {
          title: "Static-Free Jacket",
          description: "Anti-static rice-paper inner sleeve keeps the pressing dust-free for decades of spins.",
          stat: "45 RPM / 180g",
          icon: "disc",
        },
      ],
    },
  },
  {
    id: "sonic-strider-x1",
    name: "Sonic Strider X1",
    tagline: "Cyber-Knit Tech • Performance Audio Insole",
    thumbnail: null,
    placeholderIcon: "footprints",
    price: "৳129.00",
    badge: { label: "NEW DROP", tone: "lime" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "limitedPairs", label: "LIMITED TO 500 PAIRS" },
    detail: {
      model: "Model: SX-1 Strider",
      badge: { label: "NEW DROP" },
      name: "Sonic Strider X1 — Cyber-Knit Performance Trainer",
      price: "৳219.00",
      images: [null],
      colors: [
        { hex: "#0e0e0e", label: "Void Black" },
        { hex: "#cc97ff", label: "Ultraviolet" },
        { hex: "#3adffa", label: "Cyan Pulse" },
      ],
      defaultColorIndex: 0,
      sizes: ["40", "41", "42", "43", "44"],
      defaultSize: "42",
      techSpec: {
        icon: "footprints",
        title: "Audio-Reactive Insole",
        description:
          "Embedded pressure sensors sync your stride to the beat, pulsing LED threads through the cyber-knit upper in real time.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "Engineered For The Night Run",
        body: "A performance trainer built for the Zenith tour crew — breathable cyber-knit, reactive cushioning, and a sole plate tuned for city concrete.",
      },
      features: [
        {
          title: "Reactive Cushioning",
          description:
            "Dual-density foam absorbs impact on landing and rebounds energy back on takeoff for longer sessions.",
          image: null,
          icon: "footprints",
        },
        {
          title: "Grip-Lock Outsole",
          description: "Multi-directional traction pattern holds firm on wet pavement and studio floors alike.",
          stat: "500 Pairs Worldwide",
          icon: "footprints",
        },
      ],
    },
  },
  {
    id: "prism-studio-mic",
    name: "Prism Studio Mic",
    tagline: "Professional Condenser • Custom Gold Diaphragm",
    thumbnail: null,
    placeholderIcon: "mic",
    price: "৳129.00",
    badge: { label: "LIMITED STOCK", tone: "red" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "rating", count: 12 },
    detail: {
      model: "Model: PM-24 Studio",
      badge: { label: "LIMITED DROP" },
      name: "Prism Studio Mic — Gold Diaphragm Condenser",
      price: "৳349.00",
      originalPrice: "৳399.00",
      images: [null],
      colors: [
        { hex: "#0e0e0e", label: "Matte Black" },
        { hex: "#cc97ff", label: "Prism Violet" },
        { hex: "#3adffa", label: "Cyan Chrome" },
      ],
      defaultColorIndex: 0,
      techSpec: {
        icon: "mic",
        title: "Custom Gold Diaphragm",
        description:
          "A 24k gold-sputtered large diaphragm captures studio-grade detail with an ultra-low 7dB self-noise floor.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "Studio Clarity, Anywhere",
        body: "Built for vocalists and producers who need broadcast-quality capture without a treated room — cardioid pickup with built-in pop control.",
      },
      features: [
        {
          title: "Shock-Isolated Capsule",
          description:
            "Internal suspension mount cancels desk vibration and handling noise before it hits the signal chain.",
          image: null,
          icon: "mic",
        },
        {
          title: "Zero-Latency Monitoring",
          description: "Built-in headphone out lets you monitor your take in real time with no perceptible delay.",
          stat: "7dB Self-Noise",
          icon: "audioLines",
        },
      ],
    },
  },
  {
    id: "vault-sling-bag",
    name: "Vault Sling Bag",
    tagline: "Water-repellent Cordura • RFID Protection",
    thumbnail: userShopAssets.products.vaultSlingBag,
    price: "৳129.00",
    badge: { label: "LIMITED STOCK", tone: "red" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "freeShipping" },
    detail: {
      model: "Model: VB-24 Vault",
      badge: { label: "LIMITED DROP" },
      name: "Vault Sling Bag — RFID-Protected Cordura",
      price: "৳159.00",
      originalPrice: "৳189.00",
      images: [userShopAssets.products.vaultSlingBag],
      colors: [
        { hex: "#0e0e0e", label: "Void Black" },
        { hex: "#6b6b6b", label: "Slate Grey" },
        { hex: "#006877", label: "Deep Teal" },
      ],
      defaultColorIndex: 0,
      techSpec: {
        icon: "lock",
        title: "RFID-Shielded Pocket",
        description:
          "A dedicated foil-lined compartment blocks wireless skimming of cards and passports while you're on the move.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "Built For The Backstage Hustle",
        body: "Water-repellent Cordura construction with a padded tech sleeve — everything you need for load-in, load-out, and everywhere between.",
      },
      features: [
        {
          title: "Water-Repellent Shell",
          description: "A DWR coating sheds rain and spills so your gear stays dry between venues.",
          image: userShopAssets.products.vaultSlingBag,
        },
        {
          title: "Padded Tech Sleeve",
          description: "Fits a 13-inch laptop or controller with room to spare for cables and picks.",
          stat: "12L Capacity",
          icon: "lock",
        },
      ],
    },
  },
  {
    id: "frequency-graphic-tee",
    name: "Frequency Graphic Tee",
    tagline: "100% Organic Cotton • Boxy Fit",
    thumbnail: userShopAssets.products.frequencyGraphicTee,
    price: "৳129.00",
    sizes: ["S", "M", "L", "XL"],
    meta: { type: "authentic" },
    detail: {
      model: "Model: FT-24 Frequency",
      badge: { label: "ARTIST AUTHENTIC" },
      name: "Frequency Graphic Tee — Zenith Tour Print",
      price: "৳69.00",
      images: [userShopAssets.products.frequencyGraphicTee],
      sizes: ["S", "M", "L", "XL"],
      defaultSize: "M",
      techSpec: {
        icon: "shirt",
        title: "100% Organic Cotton",
        description:
          "Garment-dyed and pre-shrunk for a soft broken-in feel from the first wear, screen-printed with water-based ink.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "Wear The Waveform",
        body: "A boxy-fit tee printed with the actual waveform from the Zenith tour's closing set — soft-hand ink that won't crack or fade.",
      },
      features: [
        {
          title: "Water-Based Screen Print",
          description:
            "Soft-hand ink is worked into the fibers instead of sitting on top, so the graphic stays flexible wash after wash.",
          image: userShopAssets.products.frequencyGraphicTee,
        },
        {
          title: "Boxy Relaxed Fit",
          description: "A dropped shoulder and slightly cropped body for an off-duty, streetwear silhouette.",
          stat: "100% Organic Cotton",
          icon: "shirt",
        },
      ],
    },
  },
  {
    id: "prism-pendant",
    name: "Prism Pendant",
    tagline: "925 Sterling Silver • Hand-Polished",
    thumbnail: null,
    placeholderIcon: "gem",
    price: "৳129.00",
    badge: { label: "NEW DROP", tone: "lime" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "onlyLeft", label: "ONLY 3 LEFT" },
    detail: {
      model: "Model: PP-24 Prism",
      badge: { label: "NEW DROP" },
      name: "Prism Pendant — Hand-Polished Sterling Silver",
      price: "৳99.00",
      images: [null],
      colors: [
        { hex: "#0e0e0e", label: "Oxidized Black" },
        { hex: "#cc97ff", label: "Amethyst Inlay" },
        { hex: "#3adffa", label: "Cyan Inlay" },
      ],
      defaultColorIndex: 1,
      techSpec: {
        icon: "gem",
        title: "925 Sterling Silver Cast",
        description:
          "Hand-polished and finished with a hypoallergenic rhodium plate so it stays bright without tarnishing.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "A Keepsake From The Tour",
        body: "Cast from the Zenith tour's prism motif and finished by hand — only 3 left from this run.",
      },
      features: [
        {
          title: "Hand-Polished Finish",
          description:
            "Each pendant is buffed by hand for a mirror finish that catches the light on stage or on the street.",
          image: null,
          icon: "gem",
        },
        {
          title: "Hypoallergenic Plating",
          description:
            "A rhodium finish over sterling silver keeps the piece tarnish-resistant and safe for sensitive skin.",
          stat: "Only 3 Left",
          icon: "gem",
        },
      ],
    },
  },
  {
    id: "retro-prism-tape",
    name: "Retro Prism Tape",
    tagline: "Chrome C-60 • High Fidelity Master",
    thumbnail: userShopAssets.products.retroPrismTape,
    price: "৳129.00",
    badge: { label: "LIMITED STOCK", tone: "red" },
    colors: ["#0e0e0e", "#cc97ff", "#3adffa"],
    meta: { type: "collector", label: "COLLECTOR'S ITEM" },
    detail: {
      model: "Model: RT-24 Retro",
      badge: { label: "LIMITED DROP" },
      name: "Retro Prism Tape — Chrome C-60 Master",
      price: "৳49.00",
      originalPrice: "৳65.00",
      images: [userShopAssets.products.retroPrismTape],
      techSpec: {
        icon: "cassette",
        title: "Chrome C-60 Formulation",
        description:
          "High-fidelity chrome tape stock captures a wider dynamic range than standard ferric cassettes for a warmer analog sound.",
      },
      fastShipping: true,
      authenticityChip: true,
      description: {
        title: "For The Tape-Deck Faithful",
        body: "A limited run dubbed direct from the master reel — hiss-reduced, hand-labeled, and boxed in a collectible clamshell case.",
      },
      features: [
        {
          title: "Dolby B Noise Reduction",
          description: "Studio-grade noise reduction keeps hiss down without dulling the top end of the mix.",
          image: userShopAssets.products.retroPrismTape,
        },
        {
          title: "Collector's Clamshell Case",
          description: "Boxed in a numbered clamshell case with printed J-card art from the original tour poster.",
          stat: "60-Minute Master",
          icon: "cassette",
        },
      ],
    },
  },
]

export const findProductById = (id) => {
  const product = products.find((item) => item.id === id)
  if (!product) return undefined
  if (product.detail) return product

  return {
    ...product,
    detail: {
      name: product.name,
      price: product.price,
      badge: product.badge ? { label: product.badge.label } : undefined,
      images: [product.thumbnail],
      colors: product.colors?.map((hex) => ({ hex, label: hex })),
      defaultColorIndex: 0,
      sizes: product.sizes,
      defaultSize: product.sizes?.[0],
    },
  }
}
