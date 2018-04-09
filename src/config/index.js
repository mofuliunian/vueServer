import login from '../router/login'
import getMenu from '../router/getMenu'
import getOrder from '../router/getOrder'
import upload from '../router/upload'
import details from '../router/details'

export default (app) => {
  app.post('/api/login', login);
  app.get('/api/getMenu', getMenu);
  app.get('/api/getOrder', getOrder);
  app.get('/details', details);  
  app.post('/api/upload', upload);
}