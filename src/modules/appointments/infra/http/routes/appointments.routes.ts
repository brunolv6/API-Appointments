import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()

// para usar as rotas abaixo, este deve pasaar pelo middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

// route to try to create appointment based on data received as params
appointmentsRouter.post('/', appointmentsController.create)

// route to get data of appointments on AppointmentRepository table of Database
// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// })

export default appointmentsRouter;

// SoC - Separation of Concerns
// DTO - Data transfer Object -> transferir objetos de um arquivo ao outro
// Desestruturação

/*
  Routes
  - Receive requisition
  - Call services
  - Response something
*/

