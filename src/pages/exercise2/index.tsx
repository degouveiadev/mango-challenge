import { RangeSlider } from "@/components/range-input";
import { ExerciseLayout } from "@/components/templates/exercice/exercise";

type ExerciseTwo = {
  rangeValues : number[]
}

export default function ExerciseTwo({ rangeValues = [] }: ExerciseTwo) {
  const handleOnChange = (value: any) => {
    console.log(value)
  }

  return (
    <ExerciseLayout>
      <RangeSlider
        min={0}
        max={rangeValues.length - 1}
        rangeValues={rangeValues}
        onChange={handleOnChange}
      />
    </ExerciseLayout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/exercise2`, {
      method: 'GET',
    })
    const data = await response.json()
    const rangeValuesOrdered = data.rangeValues.sort((a: number, b: number) => a - b)

    return { props: { rangeValues: rangeValuesOrdered } }
  } catch (error) {
    return { props: { error: {} } }
  }
}
