export default function sort(data){
    for(var x = 0 ; x < data.length; x++){
        for(var y = 0; y < data.length; y++){
            if(data[x].score > data[y].score){
                var temp = data[x];
                data[x] = data[y];
                data[y] = temp;
            }
        }
    }
    return data;

}