/** CAD library + exercises migrated from engineering-portfolio `cadSoftwareData.js` */

export type CadProjectItem = {
  localId: number;
  title: string;
  description: string;
  details: string;
  specifications?: string[];
  /** Primary preview (legacy); also used if `images` is omitted */
  imageUrl?: string;
  images?: string[];
  video?: string;
};

export type CadSoftwareGroup = {
  id: string;
  name: string;
  logoUrl: string;
  /** Tailwind gradient classes for dialog header */
  color: string;
  projects: CadProjectItem[];
};

export const cadSoftware: CadSoftwareGroup[] = [
  {
    id: "solidworks",
    name: "SOLIDWORKS",
    logoUrl: "/solidworks.svg",
    color: "from-blue-600 to-cyan-700",
    projects: [
      {
        localId: 1,
        title: "4 Cylinder Engine Assembly",
        description: "Multi-part engine with mates, motion studies, and drawings.",
        details:
          "Designed a comprehensive mechanical assembly featuring precision gears, bearings, and shafts. Utilized advanced mate relationships and motion studies.",
        specifications: [
          "Total Parts: 50+",
          "Assembly Time: 120 hours",
          "Material: Steel & Aluminum",
          "Software Version: SolidWorks 2024",
        ],
        imageUrl: "/cadProjects/solidworks/cylinderEngine/Assembly.PNG",
        video: "/cadProjects/solidworks/cylinderEngine/Assembly.mp4",
        images: [
          "/cadProjects/solidworks/cylinderEngine/Assembly.PNG",
          "/cadProjects/solidworks/cylinderEngine/AssemblyDrawing.PNG",
          "/cadProjects/solidworks/cylinderEngine/ConnectingRod.PNG",
          "/cadProjects/solidworks/cylinderEngine/ConnectingRodCap.PNG",
          "/cadProjects/solidworks/cylinderEngine/CrankShaft.PNG",
          "/cadProjects/solidworks/cylinderEngine/Piston.PNG",
          "/cadProjects/solidworks/cylinderEngine/PistonPin.PNG",
          "/cadProjects/solidworks/cylinderEngine/PistonRing.PNG",
        ],
      },
      {
        localId: 2,
        title: "Heat Exchanger",
        description: "Consumer electronics housing design",
        details:
          "Created an ergonomic product enclosure with injection molding considerations, draft angles, and aesthetic surfacing techniques.",
        specifications: [
          "Material: ABS Plastic",
          "Wall Thickness: 2.5mm",
          "Draft Angle: 3°",
          "Surface Finish: Textured",
        ],
        imageUrl: "/cadProjects/solidworks/heatExchanger/Assembly.PNG",
        images: [
          "/cadProjects/solidworks/heatExchanger/Assembly.PNG",
          "/cadProjects/solidworks/heatExchanger/AssemblyDrawing.PNG",
          "/cadProjects/solidworks/heatExchanger/CoolingPlate.PNG",
          "/cadProjects/solidworks/heatExchanger/CopperPipeCType.PNG",
          "/cadProjects/solidworks/heatExchanger/Pipe1.PNG",
          "/cadProjects/solidworks/heatExchanger/Pipe2.PNG",
          "/cadProjects/solidworks/heatExchanger/Pipe3.PNG",
          "/cadProjects/solidworks/heatExchanger/SSEndPlate.PNG",
          "/cadProjects/solidworks/heatExchanger/SSEndPlate2.PNG",
          "/cadProjects/solidworks/heatExchanger/SupportRod.PNG",
        ],
      },
      {
        localId: 3,
        title: "Sheet Metal Design",
        description: "Industrial cabinet with bend analysis.",
        details:
          "Developed a sheet metal cabinet design with proper bend allowances, flat patterns, and manufacturing-ready drawings.",
        specifications: [
          "Material: 16 Gauge Steel",
          "Bend Radius: 3mm",
          "Dimensions: 600x800x400mm",
          "Weight: 45kg",
        ],
      },
    ],
  },
  {
    id: "autocad",
    name: "AUTODESK AUTOCAD",
    logoUrl: "/autocad.svg",
    color: "from-purple-600 to-pink-700",
    projects: [
      {
        localId: 1,
        title: "Floor Plan Layout",
        description: "2D architectural drawing with dimensions.",
        details:
          "Comprehensive floor plan with precise dimensions, annotations, and layered organization for residential construction.",
      },
      {
        localId: 2,
        title: "Electrical Schematic",
        description: "Single-line diagram for power distribution.",
        details:
          "Detailed electrical schematic showing power distribution, circuit protection, and component specifications.",
      },
      
    ],
  },
  {
    id: "inventor",
    name: "AUTODESK INVENTOR",
    logoUrl: "/inventor.svg",
    color: "from-blue-600 to-purple-800",
    projects: [
      {
        localId: 1,
        title: "Frame Generator",
        description: "Structural steel framework design.",
        details:
          "Industrial steel frame structure designed using Frame Generator with automated connections and BOM generation.",
      },
    ],
  },
  {
    id: "creo",
    name: "CREO",
    logoUrl: "/creo.svg",
    color: "from-pink-600 to-purple-800",
    projects: [
      {
        localId: 1,
        title: "Parametric Modeling",
        description: "Feature-based solid design.",
        details:
          "Advanced parametric modeling utilizing feature trees, relations, and family tables for design flexibility.",
      },
      {
        localId: 2,
        title: "Surfacing Project",
        description: "Advanced surface continuity.",
        details:
          "Complex surface design with G2/G3 continuity for high-quality industrial design aesthetics.",
      },
     
    ],
  },
];
