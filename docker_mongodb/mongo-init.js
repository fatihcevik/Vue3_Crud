db.createUser({
  user: 'mydbuser',
  pwd: 'pass',
  roles: [
    {
      role: 'dbOwner',
      db: 'tutorials_db',
    },
  ],
});