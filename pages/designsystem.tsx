import React from 'react';
import Image from 'next/image';
import {
  Colors,
  TextMedium,
  TextSmall,
  TitleLarge,
  TitleMedium,
  TitleSmall,
  IconCrossMark,
  IconPencil,
} from '@/design_system';

export default function DesignSystem() {
  return (
    <main>
      <div>
        <ul>
          <TitleLarge text="Title Large " />
          <TitleMedium text="Title Medium " />
          <TitleSmall text="Title Small " />
        </ul>
      </div>
      <div>
        <ul>
          <TitleLarge text="Text Large " />
          <TextMedium text="Text Medium " />
          <TextSmall text="Text Small " />
        </ul>
      </div>
      <div>
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.primary.substring(
            1,
          )}/${Colors.primary.substring(1)}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.secondary.substring(
            1,
          )}/${Colors.secondary.substring(1)}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.grey.substring(1)}/${Colors.grey.substring(
            1,
          )}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.darkgrey.substring(
            1,
          )}/${Colors.darkgrey.substring(1)}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.background.substring(
            1,
          )}/${Colors.background.substring(1)}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.alert.substring(1)}/${Colors.alert.substring(
            1,
          )}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.danger.substring(
            1,
          )}/${Colors.danger.substring(1)}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.black.substring(1)}/${Colors.black.substring(
            1,
          )}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.white.substring(1)}/${Colors.white.substring(
            1,
          )}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.blue.substring(1)}/${Colors.blue.substring(
            1,
          )}.png`}
        />
        <Image
          alt="..."
          width={350}
          height={350}
          loading="eager"
          layout="intrinsic"
          src={`https://placehold.co/100x100/${Colors.green.substring(1)}/${Colors.green.substring(
            1,
          )}.png`}
        />
      </div>
      <div>
        <IconCrossMark />
        <IconPencil />
      </div>
    </main>
  );
}
