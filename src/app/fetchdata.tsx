const getCList = async () => {
  const res = await fetch('/api/socket.io/?EIO=4&transport=polling&t=OyxwY4I');
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.text(); 
  const startIndex = data.indexOf('"sid":"') + 7; 
  const endIndex = data.indexOf('"', startIndex); 
  const sid = data.substring(startIndex, endIndex); 
  return sid; 
}

export default getCList;
