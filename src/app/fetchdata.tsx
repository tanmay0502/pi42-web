const getCList = async () => {
    const res = await fetch("https://fawss.pi42.com/socket.io/?EIO=4&transport=polling&t=OyvwMBU", { mode: 'no-cors' });
    console.log(res);
    return res;
}

export default getCList;
