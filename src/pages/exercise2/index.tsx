import { RangeSlider } from "@/components/range-input";
import { ExerciseLayout } from "@/components/templates/exercice/exercise";
import { ErrorPage } from "@/shared/error";

type ExerciseTwo = {
  rangeValues : number[],
  error?: {
    hasError: boolean,
    statusCode: number
  }
}

export default function ExerciseTwo({ rangeValues = [], error }: ExerciseTwo) {
  const handleOnChange = (value: any) => {
    console.log(value)
  }

  return (
    <ExerciseLayout
      hasError={error?.hasError}
      statusCode={error?.statusCode}
    >
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
  
    if (response.status >= 400) {
      return {
        props: {
          error: {
            hasError: true,
            statusCode: 500
          }
        }
      }
    }
  
    const data = await response.json()
    const rangeValuesOrdered = data.rangeValues
      .filter((value: number) => !isNaN(value))
      .sort((a: number, b: number) => a - b)

    return { props: { rangeValues: rangeValuesOrdered } }
  } catch (error) {
    return {
      props: {
        error: {
          hasError: true,
          statusCode: 500
        }
      }
    }
  }
}
