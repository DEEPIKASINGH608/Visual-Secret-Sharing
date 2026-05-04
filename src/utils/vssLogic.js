// ENCRYPTION: Create 2 shares (Lock and Key)
export const splitImage = (canvas) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;

  const s1Data = new Uint8ClampedArray(data.length);
  const s2Data = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    // Determine if original pixel is Black (Secret) or White (Background)
    const originalBit = data[i] < 128 ? 255 : 0;

    // Share 1: Pure Random Function
    const randBit = Math.random() > 0.5 ? 255 : 0;
    s1Data[i] = s1Data[i+1] = s1Data[i+2] = randBit;
    s1Data[i+3] = 255;

    // Share 2: Original XOR Share 1
    const xorBit = originalBit ^ randBit;
    s2Data[i] = s2Data[i+1] = s2Data[i+2] = xorBit;
    s2Data[i+3] = 255;
  }

  return [
    new ImageData(s1Data, width, height),
    new ImageData(s2Data, width, height)
  ];
};

// DECRYPTION: The "Overlay" function
export const reconstructImage = (share1, share2) => {
  const { width, height } = share1;
  const data1 = share1.data;
  const data2 = share2.data;
  const resultData = new Uint8ClampedArray(data1.length);

  for (let i = 0; i < data1.length; i += 4) {
    // Decryption Math: Share 1 XOR Share 2 = Original
    const recoveredBit = data1[i] ^ data2[i];
    resultData[i] = resultData[i+1] = resultData[i+2] = recoveredBit;
    resultData[i+3] = 255;
  }

  return new ImageData(resultData, width, height);
};

