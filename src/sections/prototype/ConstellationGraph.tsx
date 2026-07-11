import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string | number;
  type: 'contact' | 'provider';
  name: string;
  image?: string;
  score: number; // interaction_score for contacts, composite_score for providers
  metricLabel?: string; // e.g. "Budget 95%"
  recommender_id?: number; // link to contact
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | number | Node;
  target: string | number | Node;
}

export default function ConstellationGraph({ 
  contacts, 
  providers,
  onNodeClick 
}: { 
  contacts: any[], 
  providers: any[],
  onNodeClick?: (id: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous
    containerRef.current.innerHTML = '';
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    const g = svg.append('g');

    // Zoom and Pan Setup
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    // Initial transform
    svg.call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(1));

    // Prepare Base Nodes (Contacts)
    // Rank by interaction score, cap at 150
    const topContacts = [...contacts]
      .sort((a, b) => b.interaction_score - a.interaction_score)
      .slice(0, 150);

    let nodesData: Node[] = topContacts.map(c => ({
      id: c.id,
      type: 'contact',
      name: c.name,
      image: c.image,
      score: c.interaction_score
    }));

    let linksData: Link[] = [];

    // If a contact is active, bloom their providers
    if (activeContactId) {
      const activeProviders = providers.filter(p => p.recommender_id === activeContactId);
      const satelliteNodes: Node[] = activeProviders.map(p => ({
        id: `provider-${p.id}`,
        type: 'provider',
        name: p.name,
        score: p.composite_score,
        metricLabel: `Trust: ${p.composite_score}`,
        recommender_id: activeContactId
      }));
      
      nodesData = [...nodesData, ...satelliteNodes];
      
      linksData = activeProviders.map(p => ({
        source: activeContactId,
        target: `provider-${p.id}`
      }));
    }

    // Force Simulation
    const simulation = d3.forceSimulation<Node>(nodesData)
      .force('link', d3.forceLink<Node, Link>(linksData).id(d => d.id).distance(100).strength(0.5))
      .force('charge', d3.forceManyBody().strength(d => d.type === 'contact' ? -400 : -200))
      .force('collide', d3.forceCollide().radius(d => d.type === 'contact' ? (32 + (d.score/100)*24)/2 + 10 : 30))
      .force('center', d3.forceCenter(0, 0).strength(0.05));

    // Draw Links
    const link = g.append('g')
      .attr('stroke', 'rgba(192, 132, 252, 0.4)')
      .attr('stroke-width', 2)
      .selectAll('line')
      .data(linksData)
      .join('line');

    // Draw Nodes
    const node = g.append('g')
      .selectAll<SVGGElement, Node>('g')
      .data(nodesData, d => d.id)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      )
      .on('click', (event, d) => {
        if (d.type === 'contact') {
          setActiveContactId(prev => prev === d.id ? null : d.id as number);
        } else if (d.type === 'provider' && onNodeClick) {
          onNodeClick(parseInt((d.id as string).replace('provider-', '')));
        }
      });

    // Contact Nodes (Images)
    const contactsSelection = node.filter(d => d.type === 'contact');
    
    // Add glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    contactsSelection.append('circle')
      .attr('r', d => (32 + (d.score/100)*24) / 2)
      .attr('fill', d => {
        // We use patterns for images
        const patternId = `img-${d.id}`;
        if (defs.select(`#${patternId}`).empty()) {
          const r = (32 + (d.score/100)*24) / 2;
          defs.append('pattern')
            .attr('id', patternId)
            .attr('width', 1).attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append('image')
            .attr('href', d.image || '')
            .attr('width', 1).attr('height', 1)
            .attr('preserveAspectRatio', 'xMidYMid slice');
        }
        return `url(#img-${d.id})`;
      })
      .attr('stroke', d => activeContactId === d.id ? '#c084fc' : 'rgba(255,255,255,0.8)')
      .attr('stroke-width', d => activeContactId === d.id ? 3 : 2)
      .attr('filter', d => activeContactId === d.id ? 'url(#glow)' : null);

    contactsSelection.append('text')
      .text(d => d.name)
      .attr('y', d => (32 + (d.score/100)*24) / 2 + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('pointer-events', 'none');

    // Provider Nodes (Satellites)
    const providerSelection = node.filter(d => d.type === 'provider');
    
    providerSelection.append('rect')
      .attr('x', -70)
      .attr('y', -24)
      .attr('width', 140)
      .attr('height', 48)
      .attr('rx', 12)
      .attr('fill', 'rgba(30, 41, 59, 0.95)')
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 1);

    providerSelection.append('text')
      .text(d => d.name)
      .attr('y', -4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '13px')
      .attr('font-weight', '700')
      .attr('pointer-events', 'none')
      .style('text-shadow', '0px 2px 4px rgba(0,0,0,0.5)');
      
    providerSelection.append('text')
      .text(d => d.metricLabel || '')
      .attr('y', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#10b981')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('pointer-events', 'none');

    // Tick update
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x || 0)
        .attr('y1', d => (d.source as Node).y || 0)
        .attr('x2', d => (d.target as Node).x || 0)
        .attr('y2', d => (d.target as Node).y || 0);

      node
        .attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Drag functions
    function dragstarted(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [contacts, providers, activeContactId]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%', background: '#020617' }} 
      />
      <div style={{ position: 'absolute', top: '20px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none', zIndex: 10 }}>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, padding: '0 20px' }}>
          Nodes sized by interaction strength. <br/>Tap a contact to see their trusted providers.
        </p>
      </div>
    </div>
  );
}
