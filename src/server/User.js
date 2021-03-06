const pool = require("./db");
const Helper = require('./helper.js')
const { uuid } = require('uuidv4');

module.exports = {
    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object 
     */
    async create(req, res) {
      if (!req.body.email) {    
        return res.status(400).send({'email': 'Some values are missing'});
      }
      if (!req.body.password) {
          return res.status(400).send({'password': 'Some values are missing'});
      }
      if (!Helper.isValidEmail(req.body.email)) {
        return res.status(400).send({ 'email': 'Please enter a valid email address' });
      }
      const hashPassword = Helper.hashPassword(req.body.password);
  
      const createQuery = `INSERT INTO
        users(id, email, password)
        VALUES($1, $2, $3)
        returning *`;
      const values = [
        uuid(),
        req.body.email,
        hashPassword,
      ];
  
      try {
        const { rows } = await pool.query(createQuery, values);
        const token = Helper.generateToken(rows[0].id, rows[0].email);
        return res.status(201).send({ token });
      } catch(error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ 'email': 'User with that EMAIL already exist' })
        }
        return res.status(400).send(error);
      }
    },
    /**
     * Login
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    async login(req, res) {
        if (!req.body.email) {    
            return res.status(400).send({'email': 'Some values are missing'});
            }
            if (!req.body.password) {
                return res.status(400).send({'password': 'Some values are missing'});
            }
            if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'email': 'Please enter a valid email address' });
            }
      const text = 'SELECT * FROM users WHERE email = $1';
      try {
        const { rows } = await pool.query(text, [req.body.email]);
        if (!rows[0]) {
          return res.status(400).send({'email': 'The credentials you provided is incorrect'});
        }
        if(!Helper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(400).send({ 'password': 'The credentials you provided is incorrect' });
        }
        const token = Helper.generateToken(rows[0].id, rows[0].email);
        return res.status(200).send({ token });
      } catch(error) {
        return res.status(400).send(error)
      }
    }
  }
