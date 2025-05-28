/* eslint-disable no-unused-vars */
import {
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  ScatterChart, 
  Scatter,
  Legend,
  Area,
  AreaChart
} from 'recharts';
  


const RenderChart = ({chartType,chartData,scatterData}) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    
    
    const CHART_COLORS = useColorModeValue(
      [
        '#A78BFA', 
        '#60A5FA', 
        '#34D399', 
        '#FBBF24', 
        '#F472B6', 
        '#A78BFA', 
        '#6EE7B7', 
        '#FDBA74'  
      ],
      [
        '#C4B5FD', 
        '#93C5FD', 
        '#6EE7B7', 
        '#FDE047', 
        '#F9A8D4', 
        '#C7D2FE', 
        '#86EFAC', 
        '#FED7AA'  
      ]
    );

    const commonProps = {
          margin: { top: 20, right: 30, left: 20, bottom: 5 }
        };

    const gridStroke = useColorModeValue('#E2E8F0', '#4A5568');
    const axisColor = useColorModeValue('#A0AEC0', '#718096');

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[1]} stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                strokeWidth={0}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={CHART_COLORS[0]}/>
                  <stop offset="100%" stopColor={CHART_COLORS[1]}/>
                </linearGradient>
                <linearGradient id="lineGradient2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={CHART_COLORS[2]}/>
                  <stop offset="100%" stopColor={CHART_COLORS[3]}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="url(#lineGradient1)"
                strokeWidth={4}
                dot={{ fill: CHART_COLORS[0], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: CHART_COLORS[0], strokeWidth: 3, fill: 'white' }}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="units" 
                stroke="url(#lineGradient2)"
                strokeWidth={4}
                dot={{ fill: CHART_COLORS[2], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: CHART_COLORS[2], strokeWidth: 3, fill: 'white' }}
                name="Units Sold"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[2]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[2]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke={CHART_COLORS[0]}
                fill="url(#areaGradient1)"
                strokeWidth={3}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="units"
                stackId="2"
                stroke={CHART_COLORS[2]}
                fill="url(#areaGradient2)"
                strokeWidth={3}
                name="Units Sold"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <defs>
                {CHART_COLORS.map((color, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, revenue, percent }) => 
                  `${category}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="revenue"
                strokeWidth={3}
                stroke={cardBg}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient${index % CHART_COLORS.length})`}
                  />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={scatterData} {...commonProps}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="price" 
                name="Price"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                dataKey="unitsSold" 
                name="Units Sold"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                formatter={(value, name) => [
                  name === 'price' ? `$${value}` : value,
                  name === 'price' ? 'Price' : 'Units Sold'
                ]}
              />
              <Scatter 
                dataKey="unitsSold" 
                fill={CHART_COLORS[0]}
                fillOpacity={0.8}
                strokeWidth={2}
                stroke={CHART_COLORS[1]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

export default RenderChart; 
