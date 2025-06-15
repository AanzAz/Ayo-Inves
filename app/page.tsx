"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
});

export default function HomePage() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [investAmount, setInvestAmount] = useState(100000);
  const [btcAmount, setBtcAmount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=idr")
      .then(res => res.json())
      .then(data => {
        const price = data.bitcoin.idr;
        setBtcPrice(price);
        setBtcAmount(investAmount / price);
      });
  }, []);

  const handleRecalculate = () => {
    if (btcPrice) {
      setBtcAmount(investAmount / btcPrice);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Ayo Investasi - Demo Bitcoin Tracker</h1>

      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-lg font-semibold">Harga Bitcoin Saat Ini:</p>
            <p className="text-2xl text-green-600 font-bold">
              {btcPrice ? formatter.format(btcPrice) : "Loading..."}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jumlah Investasi (IDR)</label>
            <Input
              type="number"
              value={investAmount}
              onChange={(e) => setInvestAmount(parseInt(e.target.value))}
            />
          </div>

          <Button className="w-full" onClick={handleRecalculate}>
            Hitung BTC yang Didapat
          </Button>

          {btcAmount !== null && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Dengan investasi tersebut, kamu dapat:</p>
              <p className="text-xl font-semibold text-blue-600">{btcAmount.toFixed(6)} BTC</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
