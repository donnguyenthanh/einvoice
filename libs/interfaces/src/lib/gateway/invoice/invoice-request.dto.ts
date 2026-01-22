import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    ValidateNested,
    IsNumber,
    ArrayNotEmpty,
    IsArray,
} from 'class-validator';

class ClientRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
}
class ItemRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    vatRate: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;
}

export class CreateInvoiceRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ClientRequestDto)
    client: ClientRequestDto;

    @ApiProperty({ type: [ItemRequestDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ItemRequestDto)
    items: ItemRequestDto[];
}
