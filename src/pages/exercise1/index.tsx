import { RangeSlider } from "@/components/range-input";
import { ExerciseLayout } from "@/components/templates/exercice/exercise";

type ExerciseOne = {
  rangePrice : {
    min: number;
    max: number;
  },
  error?: {
    hasError: boolean,
    statusCode: number
  }
}

export default function ExerciseOne({ rangePrice, error }: ExerciseOne) {
  const handleOnChange = (value: any) => {
    console.log(value)
  }

  return (
    <ExerciseLayout
      hasError={error?.hasError}
      statusCode={error?.statusCode}
    >
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
    const rangePrice = await response.json()
    return { props: { rangePrice } }
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
