"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

const SavingsCalculator = () => {
  const [dailyOrders, setDailyOrders] = useState(100);
  const [fleetSize, setFleetSize] = useState(10);

  const { hoursSaved, moneySaved } = useMemo(() => {
    if (dailyOrders <= 0 || fleetSize <= 0) return { hoursSaved: 0, moneySaved: 0 };

    const H = 0.30; // hours per stop
    const TR = 0.20; // 20% time reduction
    const DPM = 30; // days per month
    const DC = 25; // $/hour
    const MPS = 1.2; // miles per stop
    const MR = 0.15; // 15% miles cut
    const FC = 0.80; // $/mile

    const ordersPerVehicle = dailyOrders / fleetSize;
    const hoursSavedPerDay = ordersPerVehicle * H * TR * fleetSize;
    const calculatedHoursSaved = hoursSavedPerDay * DPM;

    const labourSaved = calculatedHoursSaved * DC;
    const baseMiles = dailyOrders * MPS * DPM;
    const milesSaved = baseMiles * MR;
    const fuelSaved = milesSaved * FC;

    const calculatedMoneySaved = labourSaved + fuelSaved;

    return { hoursSaved: calculatedHoursSaved, moneySaved: calculatedMoneySaved };
  }, [dailyOrders, fleetSize]);


  return (
    <section id="calculator" className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Interactive Savings Calculator</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Adjust the sliders to see your potential monthly savings.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-2 p-6 bg-card">
            <div className="space-y-8">
              <div>
                <Label htmlFor="daily-orders" className="flex justify-between mb-2">
                    <span>Daily Orders</span>
                    <span className="font-bold text-primary">{dailyOrders}</span>
                </Label>
                <Slider
                  id="daily-orders"
                  min={10}
                  max={1000}
                  step={10}
                  value={[dailyOrders]}
                  onValueChange={(value) => setDailyOrders(value[0])}
                  aria-label="Daily Orders"
                />
              </div>
              <div>
                <Label htmlFor="fleet-size" className="flex justify-between mb-2">
                    <span>Fleet Size</span>
                    <span className="font-bold text-primary">{fleetSize}</span>
                </Label>
                <Slider
                  id="fleet-size"
                  min={1}
                  max={100}
                  step={1}
                  value={[fleetSize]}
                  onValueChange={(value) => setFleetSize(value[0])}
                  aria-label="Fleet Size"
                />
              </div>
            </div>
            <p className="mt-8 text-xs text-muted-foreground font-code">
              Formula based on industry averages. Actual savings may vary. Authenticated users can store calculations.
            </p>
             <Button className="w-full mt-4">
              <TrendingUp className="mr-2 h-4 w-4" /> Save Calculation
            </Button>
          </Card>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-card to-accent/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hours Saved / Month</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <motion.div key={`hours-${hoursSaved}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
                  {Math.round(hoursSaved).toLocaleString()}
                </motion.div>
                <p className="text-xs text-muted-foreground">+20% time reduction on average</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card to-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">$ Saved / Month</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <motion.div key={`money-${moneySaved}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
                  ${Math.round(moneySaved).toLocaleString()}
                </motion.div>
                <p className="text-xs text-muted-foreground">Labor & mileage savings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;