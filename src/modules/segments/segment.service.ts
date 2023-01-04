import { Injectable } from '@nestjs/common';
import { SegmentRepository } from './segment.repository';
import { SegmentDTO } from './segment.dto';
import { ClientRepository } from '../clients/repository/client';
import { SegmentAlreadyExistsException } from './exception/segment-already-exists';
import { SegmentNotEmptyException } from './exception/segment-not-empty';

@Injectable()
export class SegmentService {
  constructor(
    private readonly segmentRepository: SegmentRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async create(segment: SegmentDTO): Promise<void> {
    const segmentAlreadExists = await this.segmentRepository.findByName({
      idusers: segment.idusers,
      name: segment.name,
    });

    if (segmentAlreadExists) {
      throw new SegmentAlreadyExistsException('Segment already exists');
    }

    await this.segmentRepository.create({
      idusers: segment.idusers,
      name: segment.name,
    });
  }

  async update(segment: SegmentDTO): Promise<void> {
    await this.segmentRepository.update({
      idusers: segment.idusers,
      idsegments: segment.idsegments,
      segment: segment.name,
    });
  }

  async find(idusers: number): Promise<SegmentDTO[]> {
    const result = await this.segmentRepository.find(idusers);

    return result.map((item) => {
      return {
        idsegments: item.idsegments,
        name: item.name,
        createdAt: item.created_at,
      };
    });
  }

  async delete(input: { idsegments: number; idusers: number }): Promise<void> {
    const alreadyClientInSegment = await this.clientRepository.findBy(
      input.idusers,
      'idsegments',
      input.idsegments,
    );

    if (alreadyClientInSegment.length) {
      throw new SegmentNotEmptyException('Exists client this segment');
    }

    await this.segmentRepository.delete({
      idusers: input.idusers,
      idsegments: input.idsegments,
    });
  }
}
