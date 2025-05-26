const submitUplink = async (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const res = await fetch('https://uplinkmessage-vydrt4666a-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error('Uplink failed:', err);
      throw err;
    }
  };
  