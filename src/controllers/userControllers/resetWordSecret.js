import User from "../../models/userModel.js"
import bcrypt from "bcrypt";

export const resetWordSecret = async (req, res) => {
    const { id } = req.params;
    const { newWordSecret } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado!" })
        }

        const hashedWordSecret = await bcrypt.hash(newWordSecret, 10);
        user.wordSecret = hashedWordSecret;
        await user.save();
        res.status(200).json({ message: 'Palavra Secreta alterada com sucesso!', user });
    } catch (error) {
        console.error('Erro ao alterar a palavra secreta do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
}