import { IsEmail, IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Endereço de e-mail do destinatário',
    example: 'destinatario@example.com',
  })
  @IsEmail()
  readonly to: string;

  @ApiProperty({
    description: 'Assunto do e-mail',
    example: 'Seu Assunto Aqui',
  })
  @IsNotEmptyObject()
  readonly subject: string;

  @ApiProperty({
    description: 'Texto do e-mail',
    example: 'Conteúdo da mensagem aqui',
  })
  @IsNotEmptyObject()
  readonly text: string;
}
