import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const query = this.createQueryBuilder('task');

    query.where('task.id = :id', { id }).andWhere('task.userId = :userId', {
      userId: user.id,
    });

    const task = await query.getOne();

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    // Create object
    const task = this.create({
      title,
      description: description,
      status: TaskStatus.OPEN,
      user,
    });
    // Save object to DB
    await this.save(task);
    return task;
  }
}
