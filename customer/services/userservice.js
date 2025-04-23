import prismaclient from "@prisma/client";
export const registeruser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prismaclient.user.create({
        data: {
        name,
        email,
        password,
        },
    });
    return user;
}

export const getuser = async (req, res) => {
    const { id } = req.params;
    const user = await prismaclient.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    return user;
}
export const loginuser = async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaclient.user.findUnique({
        where: {
            email,
        },
    });
    if (user && user.password === password) {
        return user;
    } else {
        return null;
    }
}