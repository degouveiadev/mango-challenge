import { RangeSlider } from "@/components/range-input";
import { ExerciseLayout } from "@/components/templates/exercice/exercise";

type ExerciseOne = {
  rangePrice : {
    min: number;
    max: number;
  }
}

export default function ExerciseOne({ rangePrice }: ExerciseOne) {
  const handleOnChange = (value: any) => {
    console.log(value)
  }

  return (
    <ExerciseLayout>
      <RangeSlider
        min={rangePrice?.min}
        max={rangePrice?.max}
        onChange={handleOnChange}
      />
    </ExerciseLayout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/exercise1`, {
      method: 'GET',
    })
    const rangePrice = await response.json()
    return { props: { rangePrice } }
  } catch (error) {
    return { props: { error: {} } }
  }
}
