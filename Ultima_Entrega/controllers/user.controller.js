const logOut = (req, res) => {
    let user = req.session.user;
    req.session.destroy();
    res.render("Hasta la proxima", { data: user });
};

const adminPanel = (req, res) => {
    res.render("Panel");
};

export default {
    logOut,
    adminPanel,
};
