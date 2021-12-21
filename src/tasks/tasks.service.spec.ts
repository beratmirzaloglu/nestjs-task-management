// import { NotFoundException } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { TaskStatus } from './task-status.enum';
// import { TasksRepository } from './tasks.repository';
// import { TasksService } from './tasks.service';

// const mockTasksRepository = () => ({
//   getTasks: jest.fn(),
//   getTaskById: jest.fn(),
//   findOne: jest.fn(),
// });

// const mockUser = {
//   id: 'someId',
//   username: 'Berat',
//   password: 'password123',
//   tasks: [],
// };

// describe('TasksService', () => {
//   let tasksService: TasksService;
//   let tasksRepository;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         TasksService,
//         { provide: TasksRepository, useFactory: mockTasksRepository },
//       ],
//     }).compile();

//     tasksService = module.get(TasksService);
//     tasksRepository = module.get(TasksRepository);
//   });

//   describe('getTasks', () => {
//     it('calls TasksRepository.getTasks and returns the result', async () => {
//       expect(tasksRepository.getTasks).not.toHaveBeenCalled();
//       tasksRepository.getTasks.mockResolvedValue('someValue');
//       const result = await tasksService.getTasks(null, mockUser);
//       expect(result).toEqual('someValue');
//     });
//   });

//   describe('getTaskById', () => {
//     it('calls TasksRepository.findOne and returns the result', async () => {
//       const mockTask = {
//         title: 'Test title',
//         description: 'Test dec',
//         id: 'someId',
//         status: TaskStatus.OPEN,
//       };

//       tasksRepository.findOne.mockResolvedValue(mockTask);
//       const result = await tasksService.getTaskById('someId', mockUser);
//       expect(result).toEqual(mockTask);
//     });

//     it('calss TasksRepository.findOne and handles and error', async () => {
//       tasksRepository.findOne.mockResolvedValue(null);
//       expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });
