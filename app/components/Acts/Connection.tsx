import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export interface Point {
  x: number;
  y: number;
}

type ConnectionType = "lined" | "dotted";

interface ConnectionProps {
  startPoint: Point;
  endPoint: Point;
  type: ConnectionType;
  color?: string;
  thickness?: number;
}

interface ConnectionContainerProps {
  connections: ConnectionProps[];
  width: number;
  height: number;
}

// Calculate a single bezier curve path
const calculateBezierPath = (start: Point, end: Point): string => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Calculate control points for smooth curve
  const controlPointOffset = Math.min(distance * 0.25, 100); // Limit curve intensity
  const controlY = Math.min(Math.abs(deltaY) * 0.2, 50); // Limit vertical curve

  // Control points for the bezier curve
  const controlPoint1 = {
    x: start.x + controlPointOffset,
    y: start.y + controlY,
  };
  const controlPoint2 = {
    x: end.x - controlPointOffset,
    y: end.y - controlY,
  };

  return `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`;
};

const Connection: React.FC<ConnectionProps> = ({
  startPoint,
  endPoint,
  type,
  color = "#7A9E9B",
  thickness = 2,
}) => {
  const pathData = useMemo(
    () => calculateBezierPath(startPoint, endPoint),
    [startPoint.x, startPoint.y, endPoint.x, endPoint.y]
  );

  const strokeProps = useMemo(
    () => ({
      strokeDasharray: type === "dotted" ? [5, 5] : undefined,
      strokeWidth: thickness,
      stroke: color,
    }),
    [type, thickness, color]
  );

  return <Path d={pathData} fill="none" {...strokeProps} />;
};

const ConnectionContainer: React.FC<ConnectionContainerProps> = ({
  connections,
  width,
  height,
}) => {
  // Group connections by type and color for better performance
  const groupedConnections = useMemo(() => {
    const groups: Record<string, ConnectionProps[]> = {};

    connections.forEach((conn) => {
      const key = `${conn.type}-${conn.color}-${conn.thickness}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(conn);
    });

    return groups;
  }, [connections]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height}>
        {Object.entries(groupedConnections).map(([key, conns]) => (
          <React.Fragment key={key}>
            {conns.map((conn, index) => (
              <Connection
                key={`${key}-${index}`}
                startPoint={conn.startPoint}
                endPoint={conn.endPoint}
                type={conn.type}
                color={conn.color}
                thickness={conn.thickness}
              />
            ))}
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

export type { ConnectionProps, ConnectionContainerProps };
export { Connection, ConnectionContainer };
