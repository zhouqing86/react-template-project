module.exports = (req, res, next) => {
  const { url, body } = req;
  if (url !== '/auth/login') {
    next();
  } else if (body.username === 'admin' && body.password === '123456') {
    res.jsonp({
      id: 1,
      authorities: [],
      details: {
        remoteAddress: '10.22.17.83',
        sessionId: null,
      },
      authenticated: false,
      principal: 'admin',
      credentials: '123456',
      token: 'login_token.admin',
      name: 'admin',
    });
  } else {
    res.sendStatus(401);
  }
};
