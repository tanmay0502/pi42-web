const getCList = async () => {
    const res = await fetch("https://fawss.pi42.com/socket.io/?EIO=4&transport=polling&t=OyvwMBU");
    console.log(res.json());
    return res.json();
}

export default getCList;