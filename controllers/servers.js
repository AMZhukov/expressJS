const servers = [
  { _id: '1', name: 'AWS', status: 'working' },
  { _id: '2', name: 'Google', status: 'working' },
  { _id: '3', name: 'Yandex', status: 'working' },
  { _id: '4', name: 'Microsoft', status: 'pending' },
];

export const getAll = (req, res) => {
  res.status(200).json(servers);
};

export const create = (req, res) => {
  const newServer = {
    _id: Date.now().toString(),
    ...req.body,
  };
  servers.push(newServer);
  res.status(201).json(newServer);
};

export const remove = (req, res) => {
  // req.params.id — id — it should be equal in server.js « :id » «router.delete('/api/server/:id', remove);»
  console.log('ID', req.params.id);
  servers = servers.filter((server) => server._id !== req.params.id);
  res.status(200).json({ message: 'Server has been removed' });
};
