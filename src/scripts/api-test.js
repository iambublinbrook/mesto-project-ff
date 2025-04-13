const testApi = async () => {
  const token = '600ff3c5-dec1-43d8-a99c-2099edf0c668';
  const url = 'https://nomoreparties.co/v1/wff-cohort-36/users/me';

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error details:', errorData);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Success!', data);
  } catch (error) {
    console.error('Full error:', error);
  }
};

testApi();