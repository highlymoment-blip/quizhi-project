import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Download,
  Share2,
  Settings,
  Trash2,
  Copy,
  Zap,
  Database,
  Filter,
  Code,
  Lightbulb,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Creator Page - Node-Based Workflow Designer
 * Design: Playful Creative Studio
 * 
 * This is the main interface for designing Agent Skills using a node-based system.
 * Features:
 * - Drag-and-drop node creation
 * - Visual workflow design
 * - Node configuration panel
 * - Export functionality
 * - Graphic export
 */

interface Node {
  id: string;
  type: "input" | "process" | "output" | "decision" | "data";
  title: string;
  description: string;
  x: number;
  y: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

const NODE_TYPES = [
  {
    type: "input",
    label: "Input",
    icon: Zap,
    color: "from-[#ff6b6b] to-[#ff8fab]",
    bgColor: "#ff6b6b",
    description: "Define input parameters"
  },
  {
    type: "process",
    label: "Process",
    icon: Code,
    color: "from-[#4ecdc4] to-[#6ee7de]",
    bgColor: "#4ecdc4",
    description: "Process or transform data"
  },
  {
    type: "decision",
    label: "Decision",
    icon: Filter,
    color: "from-[#a78bfa] to-[#d8b4fe]",
    bgColor: "#a78bfa",
    description: "Conditional branching"
  },
  {
    type: "data",
    label: "Data",
    icon: Database,
    color: "from-[#ffd93d] to-[#ffed4e]",
    bgColor: "#ffd93d",
    description: "Data storage or retrieval"
  },
  {
    type: "output",
    label: "Output",
    icon: Lightbulb,
    color: "from-[#ff8fab] to-[#ff6b9d]",
    bgColor: "#ff8fab",
    description: "Define output format"
  }
];

export default function Creator() {
  const [, setLocation] = useLocation();
  const [projectName, setProjectName] = useState("My Agent Skill");
  const [projectDescription, setProjectDescription] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (type: string, x: number, y: number) => {
    const nodeType = NODE_TYPES.find(nt => nt.type === type);
    if (!nodeType) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: type as any,
      title: `${nodeType.label} ${nodes.length + 1}`,
      description: nodeType.description,
      x,
      y,
      color: nodeType.bgColor,
    };

    setNodes([...nodes, newNode]);
    toast.success(`Added ${nodeType.label} node`);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedNodeType && e.currentTarget === e.target) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addNode(draggedNodeType, x, y);
        setDraggedNodeType(null);
      }
    }
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    if (selectedNode === id) setSelectedNode(null);
    toast.success("Node deleted");
  };

  const exportAsGraphic = () => {
    // Create a canvas for export
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#faf8f3");
    gradient.addColorStop(1, "#f0e6ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = "#2d2d2d";
    ctx.font = "bold 32px Poppins";
    ctx.fillText(projectName, 40, 50);

    // Draw nodes
    nodes.forEach((node) => {
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.roundRect(node.x, node.y, 160, 80, 15);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Poppins";
      ctx.fillText(node.title, node.x + 15, node.y + 30);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "12px Poppins";
      ctx.fillText(node.description.substring(0, 15), node.x + 15, node.y + 55);
    });

    // Draw connections
    ctx.strokeStyle = "#4ecdc4";
    ctx.lineWidth = 2;
    connections.forEach((conn) => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x + 160, fromNode.y + 40);
        ctx.quadraticCurveTo(
          (fromNode.x + toNode.x) / 2,
          (fromNode.y + toNode.y) / 2,
          toNode.x,
          toNode.y + 40
        );
        ctx.stroke();
      }
    });

    // Download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${projectName.replace(/\s+/g, "-")}-workflow.png`;
    link.click();
    toast.success("Workflow exported as PNG");
  };

  const exportAsJSON = () => {
    const data = {
      name: projectName,
      description: projectDescription,
      nodes,
      connections,
      createdAt: new Date().toISOString(),
    };

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    link.download = `${projectName.replace(/\s+/g, "-")}-skill.json`;
    link.click();
    toast.success("Skill exported as JSON");
  };

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e8e0f0]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              className="rounded-full hover:bg-[#f5f3f0]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#2d2d2d]">{projectName}</h1>
              <p className="text-sm text-[#7a6a9a]">Agent Skills Creator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAsGraphic}
              className="rounded-full border-[#e8e0f0] hover:bg-[#f5f3f0]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Graphic
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportAsJSON}
              className="rounded-full border-[#e8e0f0] hover:bg-[#f5f3f0]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8fab] text-white rounded-full hover:shadow-lg"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-6 flex gap-6">
        {/* Left Sidebar - Node Palette */}
        <div className="w-64 flex-shrink-0">
          <Card className="p-4 rounded-2xl border-0 playful-shadow">
            <h3 className="font-bold text-[#2d2d2d] mb-4">Node Types</h3>
            <div className="space-y-2">
              {NODE_TYPES.map((nodeType) => {
                const Icon = nodeType.icon;
                return (
                  <div
                    key={nodeType.type}
                    draggable
                    onDragStart={() => setDraggedNodeType(nodeType.type)}
                    onDragEnd={() => setDraggedNodeType(null)}
                    className={`p-3 rounded-xl bg-gradient-to-r ${nodeType.color} text-white cursor-move hover:shadow-lg smooth-transition flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{nodeType.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-[#e8e0f0]">
              <h3 className="font-bold text-[#2d2d2d] mb-4">Project Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-[#7a6a9a] mb-2 block">
                    Project Name
                  </Label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="rounded-lg border-[#e8e0f0]"
                    placeholder="My Agent Skill"
                  />
                </div>
                <div>
                  <Label className="text-sm text-[#7a6a9a] mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="rounded-lg border-[#e8e0f0] text-sm"
                    placeholder="Describe your skill..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col gap-6">
          <Card
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="flex-1 rounded-2xl border-0 playful-shadow relative overflow-hidden bg-white min-h-[600px] cursor-crosshair"
          >
            {/* Canvas Grid Background */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4ecdc4" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(node.id);
                }}
                className={`absolute w-40 p-3 rounded-2xl text-white cursor-pointer smooth-transition ${
                  selectedNode === node.id ? "ring-2 ring-offset-2 ring-[#4ecdc4]" : ""
                } hover:shadow-lg`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  backgroundColor: node.color,
                }}
              >
                <div className="font-bold text-sm mb-1">{node.title}</div>
                <div className="text-xs opacity-90">{node.description}</div>
                {selectedNode === node.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                    className="mt-2 w-full text-xs text-white hover:bg-white/20 rounded-lg"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            ))}

            {/* Empty State */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4ecdc4] to-[#6ee7de] flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#7a6a9a] font-medium">
                    Drag nodes from the left panel to start
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 rounded-2xl border-0 playful-shadow text-center">
              <div className="text-2xl font-bold text-[#ff6b6b]">{nodes.length}</div>
              <div className="text-sm text-[#7a6a9a]">Nodes</div>
            </Card>
            <Card className="p-4 rounded-2xl border-0 playful-shadow text-center">
              <div className="text-2xl font-bold text-[#4ecdc4]">{connections.length}</div>
              <div className="text-sm text-[#7a6a9a]">Connections</div>
            </Card>
            <Card className="p-4 rounded-2xl border-0 playful-shadow text-center">
              <div className="text-2xl font-bold text-[#ffd93d]">2</div>
              <div className="text-sm text-[#7a6a9a]">Export Formats</div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Node Inspector */}
        <div className="w-64 flex-shrink-0">
          {selectedNodeData ? (
            <Card className="p-4 rounded-2xl border-0 playful-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2d2d2d]">Node Inspector</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg hover:bg-[#f5f3f0]"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div
                  className="w-full h-12 rounded-xl"
                  style={{ backgroundColor: selectedNodeData.color }}
                />

                <div>
                  <Label className="text-sm text-[#7a6a9a] mb-2 block">
                    Node Title
                  </Label>
                  <Input
                    value={selectedNodeData.title}
                    onChange={(e) => {
                      if (selectedNode) {
                        setNodes(
                          nodes.map(n =>
                            n.id === selectedNode ? { ...n, title: e.target.value } : n
                          )
                        );
                      }
                    }}
                    className="rounded-lg border-[#e8e0f0]"
                  />
                </div>

                <div>
                  <Label className="text-sm text-[#7a6a9a] mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    value={selectedNodeData.description}
                    onChange={(e) => {
                      if (selectedNode) {
                        setNodes(
                          nodes.map(n =>
                            n.id === selectedNode ? { ...n, description: e.target.value } : n
                          )
                        );
                      }
                    }}
                    className="rounded-lg border-[#e8e0f0] text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm text-[#7a6a9a] mb-2 block">
                    Type
                  </Label>
                  <div className="text-sm font-medium text-[#2d2d2d] capitalize">
                    {selectedNodeData.type}
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="w-full rounded-lg"
                  onClick={() => selectedNode && deleteNode(selectedNode)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Node
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-4 rounded-2xl border-0 playful-shadow text-center">
              <Settings className="w-8 h-8 text-[#7a6a9a] mx-auto mb-2 opacity-50" />
              <p className="text-sm text-[#7a6a9a]">
                Select a node to edit its properties
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
