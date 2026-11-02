import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'OmniBook Pro 16" M3 Max',
    slug: 'omnibook-pro-16-m3-max',
    brand: 'OmniTech',
    category: 'Electronics',
    price: 2499.99,
    compareAtPrice: 2799.99,
    inventoryCount: 42,
    rating: 4.9,
    reviewCount: 328,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Ultimate workstation powerhouse with 16-core CPU, Liquid Retina XDR display, and 22-hour battery life.',
    description: 'Engineered for developers, 3D artists, and creative professionals. Features unthrottled unified memory architecture, hardware-accelerated ray tracing, studio-quality three-mic array, and six-speaker sound system with Spatial Audio.',
    isFeatured: true,
    tags: ['workstation', 'm3 max', 'laptop', 'pro', 'developer'],
    attributes: {
      processor: 'OmniSilicon M3 Max (16-Core CPU, 40-Core GPU)',
      ram_gb: 64,
      storage_type: 'NVMe Gen4 SSD',
      storage_capacity: '1TB',
      display_size_inches: 16.2,
      resolution: '3456 x 2234 ProMotion 120Hz',
      ports: ['3x Thunderbolt 4', 'HDMI 2.1', 'SDXC slot', 'MagSafe 3'],
      battery_life_hours: 22,
      weight_kg: 2.14,
      color: 'Space Titanium',
      warranty_years: 2,
      thermal_architecture: 'Dual-fan vapor chamber cooling'
    },
    createdAt: '2026-01-15T08:00:00Z'
  },
  {
    id: 'prod-002',
    name: 'AcoustiQ Zen Elite Wireless ANC Headphones',
    slug: 'acoustiq-zen-elite-anc',
    brand: 'AcoustiQ',
    category: 'Audio',
    price: 349.00,
    compareAtPrice: 399.00,
    inventoryCount: 88,
    rating: 4.8,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Studio-master sound with hybrid Active Noise Cancellation, LDAC Hi-Res audio, and 45h playtime.',
    description: 'Equipped with custom 40mm beryllium drivers and 8 precision acoustic microphones. Delivers industry-leading transparency mode, dynamic head-tracking spatial audio, and ultra-plush memory foam earcups.',
    isFeatured: true,
    tags: ['anc', 'wireless', 'audiophile', 'bluetooth 5.3', 'hi-res'],
    attributes: {
      driver_size_mm: 40,
      driver_material: 'Pure Beryllium diaphragm',
      anc_levels: 5,
      battery_life_hours: 45,
      charging_speed: '10 min charge gives 5 hours',
      codecs_supported: ['LDAC', 'aptX Adaptive', 'AAC', 'SBC'],
      bluetooth_version: '5.3 Multipoint',
      weight_grams: 254,
      water_resistance: 'IPX4 sweat resistant',
      microphone_count: 8
    },
    createdAt: '2026-01-20T11:30:00Z'
  },
  {
    id: 'prod-003',
    name: 'Chronos Ultra GPS Adventure Smartwatch',
    slug: 'chronos-ultra-gps-smartwatch',
    brand: 'Chronos',
    category: 'Wearables',
    price: 799.00,
    compareAtPrice: 849.00,
    inventoryCount: 19,
    rating: 4.7,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Aerospace-grade titanium case, dual-frequency multi-GNSS, and depth gauge for extreme sports.',
    description: 'Built for mountaineering, ocean diving, and ultramarathons. Features an always-on 3000-nit sapphire crystal display, dual speakers for siren alerts, and advanced ECG / SpO2 cardiovascular metrics.',
    isFeatured: true,
    tags: ['smartwatch', 'titanium', 'gps', 'diving', 'health'],
    attributes: {
      case_material: 'Grade 5 Aerospace Titanium',
      display: '1.96" Sapphire AMOLED 3000 nits',
      water_depth_rating_meters: 100,
      dive_certification: 'EN13319 scuba compliant',
      battery_life_days: 4,
      gps_system: 'Dual-frequency L1 + L5 GNSS',
      sensors: ['ECG', 'Skin Temperature', 'Blood Oxygen', 'Depth Gauge', 'Compass'],
      cellular_capable: true,
      strap_type: 'Titanium Deployant Link'
    },
    createdAt: '2026-02-01T09:15:00Z'
  },
  {
    id: 'prod-004',
    name: 'VisionDome 4K AI Outdoor Security Camera',
    slug: 'visiondome-4k-ai-security-camera',
    brand: 'AegisHome',
    category: 'Smart Home',
    price: 189.99,
    compareAtPrice: 229.99,
    inventoryCount: 65,
    rating: 4.6,
    reviewCount: 240,
    images: [
      'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580982324673-82ef10a7620a?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Solar-powered 4K HDR camera with 360° pan-tilt, on-device neural human/vehicle tracking, and spotlight.',
    description: 'Protect your home perimeter with zero monthly subscription fees. Features on-device AI person/package detection, color night vision with dual ultra-bright LED spotlights, and infinite battery via integrated high-efficiency solar panel.',
    isFeatured: false,
    tags: ['security', 'smart home', '4k', 'solar', 'ai vision'],
    attributes: {
      resolution: '4K Ultra HD (3840 x 2160)',
      field_of_view_degrees: 360,
      night_vision: 'Color Night Vision up to 40ft',
      power_source: 'Integrated Solar + 10,400mAh backup cell',
      storage: 'Local MicroSD up to 512GB & End-to-End Encrypted Cloud',
      smart_ecosystems: ['Apple HomeKit', 'Google Home', 'Amazon Alexa', 'Matter'],
      siren_volume_db: 105,
      weatherproof_rating: 'IP67 waterproof'
    },
    createdAt: '2026-02-10T14:45:00Z'
  },
  {
    id: 'prod-005',
    name: 'HyperDrive ErgoDesk Carbon Fiber Pro',
    slug: 'hyperdrive-ergodesk-carbon-pro',
    brand: 'AeroWork',
    category: 'Electronics',
    price: 899.00,
    compareAtPrice: 1049.00,
    inventoryCount: 15,
    rating: 4.9,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Dual-motor electric standing desk with carbon fiber finish, integrated USB-C 100W PD dock, and OLED memory presets.',
    description: 'Precision German motors lift up to 160kg with whisper-quiet <40dB sound. Features full anti-collision safety sensors, magnetic cable management spine, and embedded 100W GaN charging hub directly inside the desk surface.',
    isFeatured: false,
    tags: ['desk', 'standing desk', 'ergonomic', 'workspace'],
    attributes: {
      dimensions_cm: '180 x 80 x 2.5',
      height_range_cm: '62 to 128',
      motor_type: 'Dual High-Torque Synchronous Motors',
      weight_capacity_kg: 160,
      noise_level_db: 38,
      docking_hub_ports: ['2x USB-C 100W PD', '2x USB-A 3.2', '1x AC outlet'],
      surface_material: 'Textured Carbon Fiber over Solid Birch core',
      memory_presets: 4
    },
    createdAt: '2026-02-14T16:20:00Z'
  },
  {
    id: 'prod-006',
    name: 'Velocity Surge Knit Carbon Running Shoes',
    slug: 'velocity-surge-knit-carbon-running-shoes',
    brand: 'StrataSport',
    category: 'Fashion',
    price: 219.99,
    compareAtPrice: 249.99,
    inventoryCount: 54,
    rating: 4.7,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Marathon racing shoe with curved full-length carbon-fiber flyplate and supercritical PEBA foam.',
    description: 'Engineered for personal records. Delivers 87% energy return with ultra-lightweight breathable engineered knit upper and Continental rubber outsole for race-day grip in all weather conditions.',
    isFeatured: true,
    tags: ['marathon', 'running', 'carbon plate', 'sneakers', 'athletics'],
    attributes: {
      cushioning_foam: 'Supercritical Nitrogen-Infused PEBA',
      plate_type: 'Full-length 3D Carbon Fiber Plate',
      drop_mm: 8,
      weight_grams_mens_9: 198,
      available_sizes_us: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      upper_construction: 'OmniKnit Hydrophobic Yarn',
      recommended_use: 'Marathon, Half Marathon, Fast Tempo runs'
    },
    createdAt: '2026-02-18T10:00:00Z'
  },
  {
    id: 'prod-007',
    name: 'Lumix Beam Ambient Smart Light Bar System',
    slug: 'lumix-beam-ambient-smart-light-bar',
    brand: 'Lumina',
    category: 'Smart Home',
    price: 129.50,
    compareAtPrice: 159.00,
    inventoryCount: 112,
    rating: 4.5,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'Screen-mirroring reactive LED lightbars with 16 million colors and HDMI 2.1 zero-lag sync box.',
    description: 'Immerse your living room or gaming battle station. Syncs seamlessly with TV, gaming consoles, and PC displays with 0ms perceptible latency, Razer Chroma, and music synchronization mode.',
    isFeatured: false,
    tags: ['rgb', 'lighting', 'gaming', 'ambient', 'tv sync'],
    attributes: {
      color_gamut: '16.8 Million Colors + Tunable White (2000K-6500K)',
      max_brightness_lumens: 1200,
      latency_ms: '<5ms real-time audio/video sync',
      connectivity: 'Wi-Fi 6 (2.4/5GHz) + Zigbee 3.0',
      mounting_options: ['Monitor Mount', 'Floor Stand', 'Wall Bracket'],
      power_consumption_watts: 24,
      voice_assistants: ['Alexa', 'Siri (via Matter)', 'Google Assistant']
    },
    createdAt: '2026-02-22T13:10:00Z'
  },
  {
    id: 'prod-008',
    name: 'OmniMag Titanium MagSafe Modular Wallet',
    slug: 'omnimag-titanium-magsafe-modular-wallet',
    brand: 'AeroWork',
    category: 'Accessories',
    price: 79.00,
    compareAtPrice: 99.00,
    inventoryCount: 145,
    rating: 4.8,
    reviewCount: 384,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDescription: 'CNC-machined Grade 5 titanium card holder with Find My tracking beacon and adjustable kickstand.',
    description: 'Holds up to 7 cards with RFID blocking shield. Built-in ultra-strong N52 neodymium magnets hold 3x stronger than standard phone wallets. Integrated Apple Find My network chip ensures you never lose your essentials.',
    isFeatured: false,
    tags: ['titanium', 'wallet', 'magsafe', 'edc', 'find my'],
    attributes: {
      card_capacity: 7,
      material: 'CNC Milled Grade 5 Titanium + Carbon Shield',
      tracking_network: 'Apple Find My Certified',
      rfid_blocking: true,
      magnet_strength: '3800 Gauss N52 array',
      kickstand_angles: ['Portrait 60°', 'Landscape 45°', 'Floating 15°'],
      thickness_mm: 7.8,
      weight_grams: 62
    },
    createdAt: '2026-02-25T18:00:00Z'
  }
];
