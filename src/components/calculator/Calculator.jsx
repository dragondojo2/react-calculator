import { useState } from "react"
import Button from "./Button"
import Screen from "./Screen";

function Calculator() {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });

    const btnValues = [
        [7, 8, 9, "DEL"],
        [4, 5, 6, "+"],
        [1, 2, 3, "-"],
        [".", 0, "/", "x"],
        ["Reset", "="]
    ];

    const mathCalculator = (a, b, sign) => {
        if (sign === '+') {
            return a + b
        } else if (sign === '-') {
            return a - b
        } else if (sign === 'x') {
            return a * b
        } else if (sign === '/') {
            return a / b
        } else {
            console.log('error')
        }
    }

    const numClick = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML

        setCalc({
            ...calc,
            num: calc.num === 0 && value === '0' ? '0'
                : calc.num % 1 === 0 ? Number(calc.num + value)
                    : calc.num + value,
            res: !calc.sign ? 0 : calc.res

        })
    }

    const signClick = (e) => {
        e.preventDefault()
        const sign = e.target.innerHTML

        setCalc({
            ...calc,
            sign: sign,
            res: !calc.res ? calc.num
                : !calc.num ? calc.res
                    : mathCalculator(calc.res, calc.num, calc.sign),
            num: 0
        })

    }

    const resetClick = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        })
    }
    const commaClick = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    }

    const deletLastUnitClick = () => {

        if (calc.num) {
            if (calc.num % 1 === 0) {
                const reduced = Math.floor(calc.num / 10)
                setCalc({
                    ...calc,
                    num: reduced
                })
            } else {
                let numberToString = calc.num.toString()
                numberToString = +numberToString.slice(0, -1)

                setCalc({
                    ...calc,
                    num: numberToString
                })
            }

        } else {
            if (calc.res % 1 === 0) {
                const reduced = Math.floor(calc.res / 10)
                setCalc({
                    ...calc,
                    res: reduced
                })
            } else {
                let numberToString = calc.res.toString()
                numberToString = +numberToString.slice(0, -1)

                setCalc({
                    ...calc,
                    res: numberToString
                })
            }

        }
    }

    const equalClick = () => {
        if (calc.sign) {

            setCalc({
                ...calc,
                res: calc.num === '0' && calc.sign === '/' ? 'Error'
                    : mathCalculator(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0

            })
        }
    }


    return (
        <div>
            <Screen value={calc.num ? calc.num : calc.res} />
            <div className="p-3 bg-indigo-900 rounded">
                {
                    btnValues.map((row, index) => {
                        return (
                            <div key={index} className={index != 4 ? "flex flex-row" : "flex flex-row justify-between"}>
                                {
                                    btnValues[index].map((btn, key) => {
                                        return (
                                            <Button
                                                key={key}
                                                type={btn === 'Reset' || btn === '=' ? 'large' : 'small'}
                                                color={btn === 'Reset' || btn === 'DEL' ? 'bg-red-700' : btn === '=' ? 'bg-blue-700' : 'bg-teal-800'}
                                                number={btn}
                                                onClick={
                                                    btn === 'DEL' ? deletLastUnitClick
                                                        : btn === 'Reset' ? resetClick
                                                            : btn === '+' || btn === '-' || btn === 'x' || btn === '/' ? signClick
                                                                : btn === '=' ? equalClick
                                                                    : btn === '.' ? commaClick
                                                                        //: btn === 'Log' ? () => { console.log(calc) }
                                                                            : numClick
                                                }
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default Calculator