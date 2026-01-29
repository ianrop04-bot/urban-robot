export default function Home() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [genCode, setGenCode] = useState('');

  const requestCode = async () => {
    const res = await fetch('/api/request-code', {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    setGenCode(data.code);
    setStep(2);
  };

  const verifyCode = async () => {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      body: JSON.stringify({ phone, code })
    });
    const data = await res.json();
    alert(data.success ? '✅ Active!' : '❌ ' + data.error);
    if (data.success) setStep(3);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <input value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={requestCode}>Get Code</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Code: {genCode}</p>
          <input value={code} onChange={e => setCode(e.target.value)} />
          <button onClick={verifyCode}>Verify</button>
        </div>
      )}
    </div>
  );
}
