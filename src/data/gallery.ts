/**
 * Gallery Data - Tridhara Milan Mandir Photo Collection
 *
 * CORRECTED VERSION - All filenames and categories verified by visual inspection
 * Date: 2025-10-31
 *
 * All images served via Cloudflare Image Transformation
 * Categories: Architecture, Deities, Rituals, Festivals
 *
 * Total: 65 unique high-quality images
 * Note: "Village" category removed - no authentic village/craft content exists
 */

export type GalleryCategory =
  | "architecture"
  | "deities"
  | "rituals"
  | "festivals"
  | "all";

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  category: Exclude<GalleryCategory, "all">;
  featured?: boolean;
}

export const galleryImages: GalleryImage[] = [
  // ============================================================================
  // ARCHITECTURE - Temple Exteriors, Campus & Night Views (20 photos)
  // ============================================================================

  {
    src: "/images/gallery/temple-interior-shikhara-ceiling-illuminated-panchmura-01.jpg",
    alt: "Interior illuminated shikhara ceiling Tridhara Milan Mandir Panchmura",
    title: "Interior Shikhara Ceiling",
    category: "architecture",
    featured: true
  },
  {
    src: "/images/gallery/temple-campus-exterior-devotees-panchmura-13.jpg",
    alt: "Temple campus exterior view with devotees Tridhara Milan Mandir Panchmura",
    title: "Temple Campus Exterior",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-campus-market-area-devotees-14.jpg",
    alt: "Temple campus market area with devotees Panchmura Bankura",
    title: "Campus Market Area",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-courtyard-aerial-view-devotees-gathering-15.jpg",
    alt: "Temple courtyard aerial view devotees gathering Tridhara Panchmura",
    title: "Courtyard Aerial View",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-night-illumination-colorful-lights-21.jpg",
    alt: "Temple exterior night illumination colorful lights Tridhara Milan Mandir",
    title: "Night Illumination",
    category: "architecture"
  },
  {
    src: "/images/gallery/illuminated-temple-shikhara-night-view-panchmura-22.jpg",
    alt: "Illuminated temple shikhara night view Panchmura Radha Krishna mandir",
    title: "Shikhara Night View",
    category: "architecture",
    featured: true
  },
  {
    src: "/images/gallery/temple-night-illumination-shikhara-architecture-23.jpg",
    alt: "Temple night illumination shikhara architecture Tridhara Milan Mandir Panchmura",
    title: "Night Shikhara Architecture",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-night-purple-lighting-tridhara-07.jpg",
    alt: "Temple exterior night purple lighting Tridhara Milan Mandir Panchmura",
    title: "Purple Night Lighting",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-night-red-orange-illumination-08.jpg",
    alt: "Temple exterior night red-orange illumination Panchmura Bankura",
    title: "Red-Orange Illumination",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-night-pink-magenta-lighting-09.jpg",
    alt: "Temple exterior night pink-magenta lighting Tridhara Panchmura",
    title: "Pink-Magenta Lighting",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-courtyard-main-building-03.jpg",
    alt: "Temple exterior courtyard main building daytime Panchmura",
    title: "Courtyard Main Building",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-complex-exterior-view-daytime-04.jpg",
    alt: "Temple complex exterior view daytime Tridhara Milan Mandir",
    title: "Complex Exterior Daytime",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-sanctum-night-illumination-golden-lights-05.jpg",
    alt: "Temple sanctum night illumination golden lights Panchmura",
    title: "Sanctum Golden Lights",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-exterior-night-festival-illumination-13.jpg",
    alt: "Temple exterior night festival illumination Tridhara Milan Mandir",
    title: "Festival Night Illumination",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-evening-illumination-devotees-gathering-01.jpg",
    alt: "Temple evening illumination devotees gathering Panchmura Bankura",
    title: "Evening Illumination",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-twilight-exterior-devotees-stairs-02.jpg",
    alt: "Temple twilight exterior devotees on stairs Tridhara Panchmura",
    title: "Twilight Exterior",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-blue-hour-evening-devotees-gathering-03.jpg",
    alt: "Temple blue hour evening devotees gathering Panchmura temple",
    title: "Blue Hour Temple",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-night-illumination-golden-lights-star-07.jpg",
    alt: "Temple night illumination golden lights star decoration Tridhara",
    title: "Golden Lights Star",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-festival-lights-purple-golden-illumination-08.jpg",
    alt: "Temple festival lights purple golden illumination Panchmura",
    title: "Purple Golden Festival Lights",
    category: "architecture"
  },
  {
    src: "/images/gallery/temple-night-illumination-moon-colorful-lights-09.jpg",
    alt: "Temple night illumination moon colorful lights Tridhara Milan Mandir",
    title: "Moonlit Temple Night",
    category: "architecture"
  },

  // ============================================================================
  // DEITIES & SHRINES - Sacred Idols & Deity Sculptures (22 photos)
  // ============================================================================

  {
    src: "/images/gallery/radha-krishna-deity-idols-silver-garments-altar-02.jpg",
    alt: "Radha Krishna deity idols in ornate silver garments at main altar Tridhara Milan Mandir",
    title: "Radha-Krishna Silver Garments",
    category: "deities",
    featured: true
  },
  {
    src: "/images/gallery/radha-krishna-deity-idols-ornate-altar-03.jpg",
    alt: "Radha Krishna deity idols ornate altar decorations Panchmura temple",
    title: "Radha-Krishna Ornate Altar",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-jagannath-deity-altar-tridhara-04.jpg",
    alt: "Radha Krishna with Jagannath deities at altar Tridhara Milan Mandir Panchmura",
    title: "Radha-Krishna with Jagannath",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-jagannath-deity-altar-tridhara-05.jpg",
    alt: "Radha Krishna Jagannath deity altar arrangement Panchmura Bankura",
    title: "Jagannath Deity Altar",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-deity-turquoise-garments-altar-17.jpg",
    alt: "Radha Krishna deity idols in turquoise garments at altar Tridhara",
    title: "Turquoise Garments Deities",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-idols-traditional-dress-altar-18.jpg",
    alt: "Radha Krishna idols in traditional dress at decorated altar Panchmura",
    title: "Traditional Dress Idols",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-deities-ornate-decoration-altar-19.jpg",
    alt: "Radha Krishna deities with ornate decorations at altar Tridhara Milan Mandir",
    title: "Ornate Decorated Deities",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-close-up-traditional-ornaments-20.jpg",
    alt: "Radha Krishna close-up with traditional ornaments Panchmura temple",
    title: "Close-up Traditional Ornaments",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-gopi-idol-sculptures-shikhara-12.jpg",
    alt: "Radha Krishna gopi idol sculptures with temple shikhara backdrop Panchmura",
    title: "Gopi Idol Sculptures",
    category: "deities"
  },
  {
    src: "/images/gallery/shiva-linga-decorated-flower-garland-tridhara-01.jpg",
    alt: "Shiva linga decorated with flower garland Shaiva shrine Tridhara Milan Mandir",
    title: "Shiva Linga Flower Garland",
    category: "deities"
  },
  {
    src: "/images/gallery/shiva-linga-marigold-garland-shakti-shrine-02.jpg",
    alt: "Shiva linga with marigold garland Shakti shrine Tridhara Panchmura",
    title: "Shiva Linga Marigold",
    category: "deities"
  },
  {
    src: "/images/gallery/mahadev-shiva-linga-shaiva-shrine-panchmura-03.jpg",
    alt: "Mahadev Shiva linga Shaiva shrine integrated worship Panchmura Bankura",
    title: "Mahadev Shrine",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-idols-ornate-traditional-dress-06.jpg",
    alt: "Radha Krishna idols in ornate traditional dress with peacock crown Tridhara",
    title: "Peacock Crown Idols",
    category: "deities"
  },
  {
    src: "/images/gallery/deity-altar-flower-garlands-decoration-02.jpg",
    alt: "Deity altar decorated with colorful flower garlands Panchmura temple",
    title: "Flower Garland Altar",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-deities-outdoor-night-festival-08.jpg",
    alt: "Large Radha Krishna deity statues outdoor night festival display Tridhara",
    title: "Outdoor Night Deities",
    category: "deities"
  },
  {
    src: "/images/gallery/krishna-deity-statue-night-illuminated-09.jpg",
    alt: "Krishna deity statue night illuminated Panchmura Bankura",
    title: "Illuminated Krishna Statue",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-deities-pair-night-outdoor-10.jpg",
    alt: "Radha Krishna deity pair outdoor night display Tridhara Milan Mandir",
    title: "Deity Pair Night",
    category: "deities"
  },
  {
    src: "/images/gallery/deity-feet-charan-flower-garland-decoration-12.jpg",
    alt: "Deity feet charan decorated with flower garlands Panchmura temple",
    title: "Decorated Deity Feet",
    category: "deities"
  },
  {
    src: "/images/gallery/radha-krishna-deities-yellow-garments-shrine-14.jpg",
    alt: "Radha Krishna deities in yellow garments inside shrine Tridhara Panchmura",
    title: "Yellow Garments Shrine",
    category: "deities"
  },
  {
    src: "/images/gallery/lord-shiva-statue-meditation-pose-outdoor-06.jpg",
    alt: "Lord Shiva statue in meditation pose outdoor Tridhara Milan Mandir campus",
    title: "Shiva Meditation Statue",
    category: "deities"
  },
  {
    src: "/images/gallery/krishna-gopis-mahabharata-mural-artwork-interior-10.jpg",
    alt: "Krishna with gopis Mahabharata mural artwork interior temple Panchmura",
    title: "Krishna Gopis Mural",
    category: "deities"
  },
  {
    src: "/images/gallery/krishna-deity-marigold-garlands-festival-decoration-11.jpg",
    alt: "Krishna deity with marigold garlands festival decorations Tridhara",
    title: "Krishna Marigold Garlands",
    category: "deities"
  },

  // ============================================================================
  // RITUALS & DAILY WORSHIP - Arati, Ceremonies, Devotees (7 photos)
  // ============================================================================

  {
    src: "/images/gallery/tridhara-evening-arati-integrated-worship-panchmura-01.jpg",
    alt: "Tridhara evening arati integrated Shaiva-Vaishnava-Shakta worship Panchmura",
    title: "Tridhara Evening Arati",
    category: "rituals",
    featured: true
  },
  {
    src: "/images/gallery/devotees-evening-arati-panchmura-radha-krishna-06.jpg",
    alt: "Devotees gathered during evening arati Panchmura Radha Krishna temple",
    title: "Devotees at Evening Arati",
    category: "rituals"
  },
  {
    src: "/images/gallery/flower-decorated-sanctum-evening-celebration-04.jpg",
    alt: "Flower decorated sanctum evening celebration Tridhara Milan Mandir",
    title: "Flower Decorated Sanctum",
    category: "rituals"
  },
  {
    src: "/images/gallery/flower-arch-decorated-sanctum-entrance-05.jpg",
    alt: "Flower arch decorated sanctum entrance Panchmura temple Bankura",
    title: "Flower Arch Entrance",
    category: "rituals"
  },
  {
    src: "/images/gallery/devotees-gathered-evening-arati-night-temple-07.jpg",
    alt: "Devotees gathered evening arati night temple Tridhara Panchmura",
    title: "Night Arati Gathering",
    category: "rituals"
  },
  {
    src: "/images/gallery/wooden-shrine-flower-garland-decorations-offerings-11.jpg",
    alt: "Wooden shrine decorated with flower garlands and offerings Panchmura",
    title: "Wooden Shrine Decorations",
    category: "rituals"
  },
  {
    src: "/images/gallery/evening-ritual-ceremony-temple-entrance-24.jpg",
    alt: "Evening ritual ceremony at temple entrance Tridhara Milan Mandir Panchmura",
    title: "Evening Ritual Ceremony",
    category: "rituals"
  },

  // ============================================================================
  // FESTIVALS & CELEBRATIONS - Durga Puja, Festival Decorations (16 photos)
  // ============================================================================

  {
    src: "/images/gallery/durga-puja-goddess-idol-ten-arms-tridhara-06.jpg",
    alt: "Durga Puja goddess idol with ten arms ornate decorations Tridhara Milan Mandir",
    title: "Durga Puja Idol Ten Arms",
    category: "festivals",
    featured: true
  },
  {
    src: "/images/gallery/durga-puja-goddess-idol-traditional-decoration-07.jpg",
    alt: "Durga Puja goddess idol traditional Bengali decorations Panchmura",
    title: "Traditional Durga Decoration",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-idol-face-closeup-ornate-crown-08.jpg",
    alt: "Durga Puja idol face closeup ornate crown Tridhara Panchmura festival",
    title: "Durga Face Closeup",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-idol-decorated-panchmura-festival-09.jpg",
    alt: "Durga Puja idol decorated Panchmura festival Bankura",
    title: "Decorated Durga Idol",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-maa-idol-ten-arms-weapons-puja-10.jpg",
    alt: "Durga Maa idol ten arms with weapons Puja celebration Tridhara",
    title: "Durga Idol Ten Arms Weapons",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-idol-artistic-blur-festival-decoration-11.jpg",
    alt: "Durga idol artistic blur festival decoration Panchmura temple",
    title: "Artistic Durga Blur",
    category: "festivals"
  },
  {
    src: "/images/gallery/deity-idol-festival-lights-balloons-celebration-16.jpg",
    alt: "Deity idol festival lights balloons celebration Tridhara Milan Mandir",
    title: "Festival Lights Balloons",
    category: "festivals"
  },
  {
    src: "/images/gallery/devotees-gathering-festival-crowd-tridhara-milan-04.jpg",
    alt: "Janmashtami celebration devotees gathering with colorful balloons Tridhara Milan Mandir Panchmura",
    title: "Janmashtami Celebration",
    category: "festivals"
  },
  {
    src: "/images/gallery/festival-decorations-balloons-devotees-gathering-05.jpg",
    alt: "Janmashtami festival decorations colorful balloons temple view Panchmura Krishna Janmashtami",
    title: "Janmashtami Balloons Decoration",
    category: "festivals"
  },
  {
    src: "/images/gallery/festival-decorations-marigold-flowers-panchmura-12.jpg",
    alt: "Festival decorations marigold flowers Krishna deity Panchmura temple",
    title: "Marigold Festival Decorations",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-ritual-worship-devotee-tridhara-01.jpg",
    alt: "Durga Puja ritual worship devotee offering prayers Tridhara Milan Mandir",
    title: "Durga Puja Ritual Worship",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-worship-devotee-offering-prayers-02.jpg",
    alt: "Durga Puja worship devotee offering prayers with garlands Panchmura",
    title: "Durga Worship Prayers",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-devotee-ritual-worship-ceremony-03.jpg",
    alt: "Durga Puja devotee ritual worship ceremony Tridhara Panchmura",
    title: "Durga Ritual Ceremony",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-ritual-offering-prayers-deity-04.jpg",
    alt: "Durga Puja ritual offering prayers to deity Panchmura Bankura",
    title: "Durga Ritual Offerings",
    category: "festivals"
  },
  {
    src: "/images/gallery/tridhara-temple-durga-puja-festival-exterior-05.jpg",
    alt: "Tridhara Milan Mandir temple exterior during Durga Puja festival Panchmura",
    title: "Durga Puja Temple Exterior",
    category: "festivals"
  },
  {
    src: "/images/gallery/durga-puja-procession-tridhara-milan-mandir-06.jpg",
    alt: "Durga Puja procession on temple steps Tridhara Milan Mandir Panchmura",
    title: "Durga Puja Procession",
    category: "festivals"
  }
];

// Category configuration for filtering (Village category removed)
export const galleryCategories = [
  { id: "all" as const, label: "All Photos", count: galleryImages.length },
  { id: "architecture" as const, label: "Temple Architecture", count: galleryImages.filter(img => img.category === "architecture").length },
  { id: "deities" as const, label: "Deities & Shrines", count: galleryImages.filter(img => img.category === "deities").length },
  { id: "rituals" as const, label: "Daily Rituals", count: galleryImages.filter(img => img.category === "rituals").length },
  { id: "festivals" as const, label: "Festivals", count: galleryImages.filter(img => img.category === "festivals").length }
] as const;

// Featured images for hero carousel
export const featuredImages = galleryImages.filter(img => img.featured);
