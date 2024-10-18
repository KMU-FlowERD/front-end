'use client';

import React, { JSX } from 'react';

import { useDrawToolsStore } from '@/features/draw-tools';
import { ERDRelation, ERDTable } from '@/features/erd-project';
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
  TableDirectionChild,
} from '@/features/table-mapping';

interface ConnectLineProps {
  tables: ERDTable[];
  relation: ERDRelation;
  tableDirection: Map<ERDTable['id'], TableDirectionChild>;
  selfReferenceMapping: Map<ERDTable['id'], number>;
}

export function ConnectLine({
  tables,
  relation,
  tableDirection,
  selfReferenceMapping,
}: ConnectLineProps) {
  return (
    <SvgComponent
      tables={tables}
      relation={relation}
      tableDirection={tableDirection}
      selfReferenceMapping={selfReferenceMapping}
    />
  );
}

function SvgComponent({
  tables,
  relation,
  tableDirection,
  selfReferenceMapping,
}: ConnectLineProps) {
  const notation = useDrawToolsStore((state) => state.notation);

  const lines: JSX.Element[] = [];

  const fromTable = tables.find((t) => t.id === relation.from);
  const toTable = tables.find((t) => t.id === relation.to);

  if (fromTable && toTable) {
    const navigateLines = [];

    const { fromDirection, toDirection, lastFromPosition, lastToPosition } =
      getStartEndPosition(fromTable, toTable, tableDirection, relation);

    if (fromTable.id !== toTable.id) {
      navigateLines.push(
        ...getDrawLines(
          fromDirection,
          toDirection,
          lastFromPosition,
          lastToPosition,
        ),
      );
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

      if (relation.type === 'ONE-TO-MANY')
        drawLines.push(...getManyLines(toDirection, updatedTo));
      else if (relation.type === 'ONE-TO-ONE')
        drawLines.push(getEndIEOneLine(toDirection, updatedTo));

      if (
        relation.multiplicity &&
        relation.multiplicity.to &&
        relation.multiplicity.to === 'OPTIONAL'
      ) {
        drawCircles.push(getStartIENullableCircle(fromDirection, updatedFrom));
      } else {
        drawLines.push(getStartIENotNullOneLine(fromDirection, updatedFrom));
      }

      if (
        relation.multiplicity &&
        relation.multiplicity.from &&
        relation.multiplicity.from === 'OPTIONAL'
      ) {
        drawCircles.push(getEndIENullableCircle(toDirection, updatedTo));
      } else {
        drawLines.push(getEndIENotNullOneLine(toDirection, updatedTo));
      }
    } else {
      drawCircles.push(getEndIDEFCircle(toDirection, updatedTo));

      if (
        relation.multiplicity &&
        relation.multiplicity.from &&
        relation.multiplicity.from === 'OPTIONAL'
      ) {
        drawPolygons.push(
          getStartIDEFNullablePolygon(fromDirection, updatedFrom),
        );
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
          stroke='#ededed'
          strokeWidth='1'
          strokeDasharray={relation.identify ? '0' : '5,5'}
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
          stroke='#ededed'
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
          stroke='#ededed'
          strokeWidth='1'
        />,
      );
    });

    drawPolygons.forEach((polygon) => {
      lines.push(
        <polygon
          key={Math.random().toString(36).slice(2)}
          points={polygon.positions}
          stroke='#ededed'
          strokeWidth='1'
          fill='#2f2f2f'
        />,
      );
    });
  }

  return lines;
}
