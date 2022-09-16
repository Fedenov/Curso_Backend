const random = (req, res) => {
    const calc = fork("./Entrega_12/calcRandom.js");

    let cant = req.query.cant;
    if (isNaN(cant)) {
        cant = 1000000;
    }

    calc.send(cant);
    calc.on("message", (numbers) => {
        res.json(numbers);
    });
};

export { random };
