export const user = {
  signin(req, res) {
    if (req.body.username.trim() === 'jcobhams') {
      if (req.body.password.trim() === 'passworded') {
        return res
        .status(202)
        .send({
          token: 'random12234rtoken',
          data: {
            id: 1,
            username: req.body.username.trim(),
            fullName: 'Joseph Cobhams'
          },
          message: 'user successfully logged in'
        });
      } else {
        return res
        .status(401)
        .send({
          error: 'username or password is incorrect'
        });
      }
    } else {
      return res
      .status(401)
      .send({
        error: 'username or password is incorrect'
      });
    }
    
  },

  getAll(req, res){
    return res
      .status(200)
      .send({
        data: [
          {
            id: 1,
            username: 'jcobhams',
            fullName: 'Joseph Cobhams'
          },
          {
            id: 2,
            username: 'jattoade',
            fullName: 'Aminujatto Abdulqahhar'
          }
        ],
        message: 'all users retrieved'
      })
  }
}