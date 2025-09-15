"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
// Removed tabs import - using simple layout instead
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  Zap,
  Timer,
  HardDrive,
  Wifi,
  Eye,
  BarChart3
} from 'lucide-react';
import PerformanceTester from '@/app/utils/performanceTester';

interface TestResult {
  name: string;
  value: number;
  unit: string;
  status: 'pass' | 'fail' | 'warning';
  baseline?: number;
  target?: number;
  improvement?: string;
  timestamp: number;
}

interface PerformanceReport {
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    warnings: number;
    overallScore: number;
  };
  results: TestResult[];
  recommendations: string[];
  timestamp: number;
  duration: number;
}

const PerformanceTestPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [error, setError] = useState<string>('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Timer className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (testName: string) => {
    if (testName.includes('Paint') || testName.includes('Interactive')) {
      return <Zap className="w-4 h-4" />;
    }
    if (testName.includes('Bundle') || testName.includes('Memory')) {
      return <HardDrive className="w-4 h-4" />;
    }
    if (testName.includes('Cache') || testName.includes('Network')) {
      return <Wifi className="w-4 h-4" />;
    }
    if (testName.includes('Image') || testName.includes('Prefetch')) {
      return <Eye className="w-4 h-4" />;
    }
    return <BarChart3 className="w-4 h-4" />;
  };

  const runPerformanceTests = async () => {
    setIsRunning(true);
    setError('');
    setProgress(0);

    try {
      const tester = new PerformanceTester();
      
      // Simular progreso durante las pruebas
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await tester.runAllTests();
      
      clearInterval(progressInterval);
      setProgress(100);
      setReport(result);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error ejecutando pruebas');
    } finally {
      setIsRunning(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'ms') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}s` : `${Math.round(value)}ms`;
    }
    if (unit === 'score' && value < 1) {
      return value.toFixed(3);
    }
    return `${value}${unit}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Testing Center
          </CardTitle>
          <CardDescription>
            Ejecuta pruebas completas de performance para medir el impacto de las optimizaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={runPerformanceTests} 
              disabled={isRunning}
              size="lg"
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Ejecutando Pruebas...' : 'Ejecutar Pruebas de Performance'}
            </Button>
            
            {isRunning && (
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progreso: {progress}%</span>
                  <span>{currentTest}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="w-4 h-4" />
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {report && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resumen de Resultados</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <span className={`font-bold ${getScoreColor(report.summary.overallScore)}`}>
                    {report.summary.overallScore}/100
                  </span>
                </Badge>
              </CardTitle>
              <CardDescription>
                Ejecutado en {report.duration}ms - {new Date(report.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {report.summary.passed}
                  </div>
                  <div className="text-sm text-green-700">Pasaron</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {report.summary.warnings}
                  </div>
                  <div className="text-sm text-yellow-700">Advertencias</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {report.summary.failed}
                  </div>
                  <div className="text-sm text-red-700">Fallaron</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {report.summary.totalTests}
                  </div>
                  <div className="text-sm text-blue-700">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-4">
            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Core Web Vitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.results
                    .filter(r => ['First Contentful Paint (FCP)', 'Largest Contentful Paint (LCP)', 'Cumulative Layout Shift (CLS)', 'Time to Interactive (TTI)'].includes(r.name))
                    .map((result) => (
                      <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <div className="font-medium">{result.name}</div>
                            {result.improvement && (
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {result.improvement} vs baseline
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {formatValue(result.value, result.unit)}
                          </div>
                          {result.target && (
                            <div className="text-xs text-gray-500">
                              Target: {formatValue(result.target, result.unit)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Otras Métricas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.results
                    .filter(r => !['First Contentful Paint (FCP)', 'Largest Contentful Paint (LCP)', 'Cumulative Layout Shift (CLS)', 'Time to Interactive (TTI)'].includes(r.name))
                    .map((result) => (
                      <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(result.name)}
                          <div>
                            <div className="font-medium text-sm">{result.name}</div>
                            <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {formatValue(result.value, result.unit)}
                          </div>
                          {result.improvement && (
                            <div className="text-xs text-green-600">
                              {result.improvement}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones de Optimización</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestPanel;