import User from "../../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    try {
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret);

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado!" })
        }

        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass;
        await user.save();
        res.status(200).json({ message: 'Senha alterada com sucesso!', user });
    } catch (error) {
        console.error('Erro ao alterar a senha do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
}