import moment from "moment";

export const getInitials = (name)=>{
    if(!name) return "";

    const words = name.split(" ")
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0]
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num)=>{
    console.log(num);
if(num === null || isNaN(num)) return "";

const [integerPart, fractionalPart] = num.toString().split(".")
const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}


export const prepareExpenseChartData = (data = []) =>{
    const chartData = data.map((item)=> ({
        category: item?.category,
        amount: item?.amount,
        description: item?.description
    }))

    return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))
    const chartData = sortData.map((item) => ({
        month: moment(item?.date).format('DD MM'),
        amount: item?.amount,
        source: item?.source
    }));

    return chartData;
} 

export const prepareExpenseLineChartData = (data = []) => {
    const sortData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))
    const chartData = sortData.map((item) => ({
        month: moment(item?.date).format('DD MM'),
        amount: item?.amount,
        category: item?.category
    }));

    return chartData;
}