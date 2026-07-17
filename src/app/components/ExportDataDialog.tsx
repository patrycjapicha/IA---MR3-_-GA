import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Download, Cloud, Calendar, Database, FileSpreadsheet, Settings, Check, Clock, AlertCircle } from '@/components/icons/flora';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { memoryFolders } from './dashboard/data-clean';

interface ExportDataDialogProps {
  trigger?: React.ReactNode;
  onExport?: (config: ExportConfig) => void;
}

interface ExportConfig {
  frequency: 'one-time' | 'recurring';
  schedule?: {
    interval: 'daily' | 'weekly' | 'monthly';
    time: string;
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
  };
  destination: 'download' | 's3';
  s3Config?: {
    bucket: string;
    region: string;
    path: string;
  };
  datasets: string[];
  format: 'csv' | 'json' | 'xlsx';
  includeMeta: boolean;
}

// Extract actual datasets from all folders
const availableDatasets = memoryFolders.flatMap(folder => 
  folder.insights
    .filter(insight => insight.type === 'dataset')
    .map(insight => ({
      id: `${folder.id}-${insight.id}`,
      name: insight.title,
      description: insight.summary,
      folderName: folder.name,
      createdBy: insight.createdBy,
      views: insight.views || 0,
      // Mock size and records for display
      size: ['2.3 MB', '1.8 MB', '3.4 MB', '1.1 MB'][Math.floor(Math.random() * 4)],
      records: ['15,420', '8,950', '27,680', '12,340'][Math.floor(Math.random() * 4)]
    }))
);

export function ExportDataDialog({ trigger, onExport }: ExportDataDialogProps) {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState<'one-time' | 'recurring'>('one-time');
  const [destination, setDestination] = useState<'download' | 's3'>('download');
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [format, setFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [includeMeta, setIncludeMeta] = useState(true);
  const [schedule, setSchedule] = useState({
    interval: 'weekly' as 'daily' | 'weekly' | 'monthly',
    time: '09:00',
    dayOfWeek: 1, // Monday
    dayOfMonth: 1
  });
  const [s3Config, setS3Config] = useState({
    bucket: '',
    region: 'us-east-1',
    path: 'analytics-exports/'
  });

  // Single dataset selection (no longer used with dropdown, but keeping for compatibility)
  const handleDatasetToggle = (datasetId: string) => {
    setSelectedDatasets([datasetId]);
  };

  const handleExport = () => {
    // Validation
    if (selectedDatasets.length === 0) {
      toast.error('No dataset selected', {
        description: 'Please select a dataset to export.',
        icon: <AlertCircle className="w-4 h-4" />
      });
      return;
    }

    if (destination === 's3' && !s3Config.bucket.trim()) {
      toast.error('S3 bucket required', {
        description: 'Please specify an S3 bucket name.',
        icon: <AlertCircle className="w-4 h-4" />
      });
      return;
    }

    const config: ExportConfig = {
      frequency,
      destination,
      datasets: selectedDatasets,
      format,
      includeMeta,
      ...(frequency === 'recurring' && { schedule }),
      ...(destination === 's3' && { s3Config })
    };
    
    const selectedDataset = availableDatasets.find(d => d.id === selectedDatasets[0]);
    const datasetName = selectedDataset?.name || 'dataset';
    
    // Show appropriate toast based on configuration
    if (frequency === 'one-time') {
      if (destination === 'download') {
        toast.success('Export started!', {
          description: `Preparing "${datasetName}" for download...`,
          icon: <Download className="w-4 h-4" />
        });
      } else {
        toast.success('Export to S3 initiated!', {
          description: `Uploading "${datasetName}" to ${s3Config.bucket}...`,
          icon: <Cloud className="w-4 h-4" />
        });
      }
    } else {
      toast.success('Recurring export scheduled!', {
        description: `"${datasetName}" will export ${schedule.interval} at ${schedule.time}`,
        icon: <Clock className="w-4 h-4" />
      });
    }
    
    onExport?.(config);
    setOpen(false);
  };

  const getTotalSize = () => {
    return selectedDatasets.reduce((total, id) => {
      const dataset = availableDatasets.find(d => d.id === id);
      if (!dataset) return total;
      const size = parseFloat(dataset.size.replace(/[^0-9.]/g, ''));
      const unit = dataset.size.includes('MB') ? 'MB' : 'KB';
      return total + (unit === 'MB' ? size : size / 1024);
    }, 0).toFixed(1);
  };

  const getTotalRecords = () => {
    return selectedDatasets.reduce((total, id) => {
      const dataset = availableDatasets.find(d => d.id === id);
      if (!dataset) return total;
      return total + parseInt(dataset.records.replace(/,/g, ''));
    }, 0).toLocaleString();
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Download className="w-4 h-4 mr-2" />
      Export Data
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Create New Export
          </DialogTitle>
          <DialogDescription>
            Select a dataset and configure export frequency, destination type (file download or S3 cloud storage), and format options.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Frequency Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Export Frequency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Frequency</Label>
                  <Select 
                    value={frequency === 'one-time' ? 'one-time' : schedule.interval} 
                    onValueChange={(value) => {
                      if (value === 'one-time') {
                        setFrequency('one-time');
                      } else {
                        setFrequency('recurring');
                        setSchedule(prev => ({ ...prev, interval: value as 'daily' | 'weekly' | 'monthly' }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time Export</SelectItem>
                      <SelectItem value="daily">Daily Export</SelectItem>
                      <SelectItem value="weekly">Weekly Export</SelectItem>
                      <SelectItem value="monthly">Monthly Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {frequency === 'recurring' && (
                  <div className="p-4 bg-muted/20 rounded-lg space-y-4">
                    <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Configure schedule details
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Time</Label>
                        <Input 
                          type="time" 
                          value={schedule.time}
                          onChange={(e) => setSchedule(prev => ({ ...prev, time: e.target.value }))}
                        />
                      </div>
                      {schedule.interval === 'weekly' && (
                        <div>
                          <Label>Day of Week</Label>
                          <Select value={schedule.dayOfWeek.toString()} onValueChange={(value) => 
                            setSchedule(prev => ({ ...prev, dayOfWeek: parseInt(value) }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Monday</SelectItem>
                              <SelectItem value="2">Tuesday</SelectItem>
                              <SelectItem value="3">Wednesday</SelectItem>
                              <SelectItem value="4">Thursday</SelectItem>
                              <SelectItem value="5">Friday</SelectItem>
                              <SelectItem value="6">Saturday</SelectItem>
                              <SelectItem value="0">Sunday</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {schedule.interval === 'monthly' && (
                        <div>
                          <Label>Day of Month</Label>
                          <Input 
                            type="number" 
                            min="1" 
                            max="31" 
                            value={schedule.dayOfMonth}
                            onChange={(e) => setSchedule(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Destination Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cloud className="w-4 h-4" />
                  Export Type & Destination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Export Type</Label>
                  <Select value={destination} onValueChange={(value: 'download' | 's3') => setDestination(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <div>
                            <div>File to Download</div>
                            <div className="text-sm text-muted-foreground">Download directly to your computer</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="s3">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-4 h-4" />
                          <div>
                            <div>Send to Cloud Storage (S3)</div>
                            <div className="text-sm text-muted-foreground">Upload to Amazon S3 bucket</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {destination === 's3' && (
                  <div className="p-4 bg-muted/20 rounded-lg space-y-4">
                    <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Cloud className="w-4 h-4" />
                      Configure S3 cloud storage destination
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>S3 Bucket Name</Label>
                        <Input 
                          placeholder="my-analytics-bucket"
                          value={s3Config.bucket}
                          onChange={(e) => setS3Config(prev => ({ ...prev, bucket: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>AWS Region</Label>
                        <Select value={s3Config.region} onValueChange={(value) => 
                          setS3Config(prev => ({ ...prev, region: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                            <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                            <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                            <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                            <SelectItem value="eu-central-1">Europe (Frankfurt)</SelectItem>
                            <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>S3 Path (Optional)</Label>
                      <Input 
                        placeholder="analytics-exports/"
                        value={s3Config.path}
                        onChange={(e) => setS3Config(prev => ({ ...prev, path: e.target.value }))}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Folder path within the bucket where files will be stored
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dataset Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="w-4 h-4" />
                  Select Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Choose Dataset</Label>
                  <Select 
                    value={selectedDatasets[0] || ''} 
                    onValueChange={(value) => setSelectedDatasets(value ? [value] : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dataset to export" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDatasets.map((dataset) => (
                        <SelectItem key={dataset.id} value={dataset.id}>
                          <div className="flex flex-col">
                            <span>{dataset.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {dataset.folderName} • {dataset.records} records • {dataset.size}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use to report cross datasets
                  </p>
                </div>
                {selectedDatasets.length > 0 && (
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="text-sm mb-1">Selected Dataset:</div>
                    {availableDatasets
                      .filter(dataset => selectedDatasets.includes(dataset.id))
                      .map(dataset => (
                        <div key={dataset.id} className="text-sm text-muted-foreground">
                          <div>{dataset.name}</div>
                          <div>{dataset.description}</div>
                          <div className="mt-1">
                            <Badge variant="outline" className="mr-2">{dataset.folderName}</Badge>
                            <span>{dataset.records} records • {dataset.size}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Format Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileSpreadsheet className="w-4 h-4" />
                  Export Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>File Format</Label>
                  <Select value={format} onValueChange={(value: 'csv' | 'json' | 'xlsx') => setFormat(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                      <SelectItem value="json">JSON (JavaScript Object Notation)</SelectItem>
                      <SelectItem value="xlsx">XLSX (Excel Spreadsheet)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={includeMeta}
                    onCheckedChange={(checked) => setIncludeMeta(checked as boolean)}
                  />
                  <Label>Include metadata and timestamps</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Export Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm mb-2">Frequency</div>
                  <Badge variant={frequency === 'one-time' ? 'default' : 'secondary'}>
                    {frequency === 'one-time' ? 'One-time' : 'Recurring'}
                  </Badge>
                  {frequency === 'recurring' && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {schedule.interval} at {schedule.time}
                      {schedule.interval === 'weekly' && `, ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.dayOfWeek]}`}
                      {schedule.interval === 'monthly' && `, day ${schedule.dayOfMonth}`}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="text-sm mb-2">Destination</div>
                  <Badge variant={destination === 'download' ? 'default' : 'secondary'}>
                    {destination === 'download' ? 'Download' : 'Amazon S3'}
                  </Badge>
                  {destination === 's3' && s3Config.bucket && (
                    <div className="text-sm text-muted-foreground mt-1">
                      s3://{s3Config.bucket}/{s3Config.path}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium mb-2">Selected Dataset</div>
                  {selectedDatasets.length > 0 ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        {availableDatasets.find(d => d.id === selectedDatasets[0])?.name || 'Unknown dataset'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getTotalRecords()} records
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ~{getTotalSize()} MB estimated size
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">No dataset selected</div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium mb-2">Format</div>
                  <Badge variant="outline">{format.toUpperCase()}</Badge>
                  {includeMeta && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Includes metadata
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleExport} 
                    className="w-full"
                    disabled={selectedDatasets.length === 0 || (destination === 's3' && !s3Config.bucket)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {frequency === 'one-time' ? 'Export Now' : 'Schedule Export'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}