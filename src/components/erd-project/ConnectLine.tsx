'use client';

import type { JSX, RefObject } from 'react';
import React, { useRef } from 'react';

import { useDrawToolsStore } from '@/features/draw-tools';
import { useOutsideClick } from '@/features/erd-page/erd-page.table.hook';
import type { ERDRelation } from '@/features/erd-project';
import {
  getDrawLines,
  getDrawLinesselfReferenceMapping,
  getEndIDEFCircle,
  getEndIENotNullOneLine,
  getEndIENullableCircle,
  getEndIEOneLine,
  getManyLines,
  getStartEndPosition,
  getStartIDEFNullablePolygon,
  getStartIENotNullOneLine,
  getStartIENullableCircle,
  getStartIEOneLine,
} from '@/features/mapping';
import { useDiagramContext } from '@/providers/DiagramChooseProvider';
import { useMappingContext } from '@/providers/MappingProvider';

interface ConnectLineProps {
  relation: ERDRelation;
  relationRef: RefObject<HTMLDivElement>;
}

export function ConnectLine({ relation, relationRef }: ConnectLineProps) {
  return <SvgComponent relation={relation} relationRef={relationRef} />;
}

function SvgComponent({ relation, relationRef }: ConnectLineProps) {
  const { diagram, mapping, setMappingId } = useDiagramContext();

  const notation = useDrawToolsStore((state) => state.notation);

  const { tableDirection, selfReferenceMapping, openContextMenu } = useMappingContext();

  const ref = useRef<SVGLineElement | null>(null);

  useOutsideClick(
    [ref],
    [relationRef],
    () => {
      setMappingId(undefined);
    },
    true,
  );

  if (diagram === undefined) return null;

  const { tables } = diagram;

  const lines: JSX.Element[] = [];

  const fromTable = tables.find((t) => t.id === relation.from);
  const toTable = tables.find((t) => t.id === relation.to);

  if (fromTable && toTable) {
    const navigateLines = [];

    const { fromDirection, toDirection, lastFromPosition, lastToPosition } = getStartEndPosition(
      fromTable,
      toTable,
      tableDirection,
      relation,
    );

    if (fromTable.id !== toTable.id) {
      navigateLines.push(...getDrawLines(fromDirection, toDirection, lastFromPosition, lastToPosition));
    } else {
      const selfReferenceMappingCount = selfReferenceMapping.get(fromTable.id);
      if (selfReferenceMappingCount !== undefined)
        selfReferenceMapping.set(fromTable.id, selfReferenceMappingCount + 1);

      navigateLines.push(
        ...getDrawLinesselfReferenceMapping(
          lastFromPosition,
          lastToPosition,
          fromTable.height / 2,
          selfReferenceMapping.get(fromTable.id),
        ),
      );
    }

    const updatedFrom = lastFromPosition;
    const updatedTo = lastToPosition;

    const drawLines = [];
    const drawCircles = [];
    const drawPolygons = [];

    if (notation === 'IE') {
      drawLines.push(getStartIEOneLine(fromDirection, updatedFrom));

      if (relation.cardinality?.to === 'MANY') drawLines.push(...getManyLines(toDirection, updatedTo));
      else if (relation.cardinality?.to === 'ONE') drawLines.push(getEndIEOneLine(toDirection, updatedTo));

      if (relation.participation && relation.participation.to && relation.participation.to === 'PARTIAL') {
        drawCircles.push(getStartIENullableCircle(fromDirection, updatedFrom));
      } else {
        drawLines.push(getStartIENotNullOneLine(fromDirection, updatedFrom));
      }

      if (relation.participation && relation.participation.from && relation.participation.from === 'PARTIAL') {
        drawCircles.push(getEndIENullableCircle(toDirection, updatedTo));
      } else {
        drawLines.push(getEndIENotNullOneLine(toDirection, updatedTo));
      }
    } else {
      drawCircles.push(getEndIDEFCircle(toDirection, updatedTo));

      if (relation.participation.to === 'PARTIAL') {
        drawPolygons.push(getStartIDEFNullablePolygon(fromDirection, updatedFrom));
      }
    }

    navigateLines.forEach((line) => {
      lines.push(
        <line
          key={Math.random().toString(36).slice(2)}
          x1={line.fromX}
          y1={line.fromY}
          x2={line.toX}
          y2={line.toY}
          stroke={relation.id === mapping?.id ? '#f2ff00' : '#ededed'}
          strokeWidth='1'
          strokeDasharray={relation.identify ? '0' : '5,5'}
        />,
      );

      // 이벤트용 투명 선
      lines.push(
        <line
          ref={ref}
          key={Math.random().toString(36).slice(2)}
          x1={line.fromX}
          y1={line.fromY}
          x2={line.toX}
          y2={line.toY}
          stroke='transparent'
          strokeWidth='10'
          style={{ cursor: 'pointer' }}
          onContextMenu={(e) => openContextMenu(e, relation)}
          onClick={() => {
            setMappingId(relation.id);
          }}
        />,
      );
    });

    drawLines.forEach((line) => {
      lines.push(
        <line
          key={Math.random().toString(36).slice(2)}
          x1={line.fromX}
          y1={line.fromY}
          x2={line.toX}
          y2={line.toY}
          stroke={relation.id === mapping?.id ? '#f2ff00' : '#ededed'}
          strokeWidth='1'
        />,
      );
    });

    drawCircles.forEach((circle) => {
      lines.push(
        <circle
          key={Math.random().toString(36).slice(2)}
          r={circle.radius}
          cx={circle.x}
          cy={circle.y}
          stroke={relation.id === mapping?.id ? '#f2ff00' : '#ededed'}
          strokeWidth='1'
        />,
      );
    });

    drawPolygons.forEach((polygon) => {
      lines.push(
        <polygon
          key={Math.random().toString(36).slice(2)}
          points={polygon.positions}
          stroke={relation.id === mapping?.id ? '#f2ff00' : '#ededed'}
          strokeWidth='1'
          fill='#2f2f2f'
        />,
      );
    });
  }

  return lines;
}
