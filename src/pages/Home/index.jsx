import Bar from '/src/components/Bar'

const Home = () => {
  return (
    <div>
      <Bar title={'Satisfaction with the use of mainstream frameworks'} 
        xData={['react', 'vue', 'angular']}
        yData={[100, 200, 300]}
        style={{ width: 500, height: 500 }} />
              <Bar title={'Satisfaction with the use of mainstream frameworks'} 
        xData={['react', 'vue', 'angular']}
        yData={[100, 200, 300]}
        style={{ width: 500, height: 500 }} />
              <Bar title={'Satisfaction with the use of mainstream frameworks'} 
        xData={['react', 'vue', 'angular']}
        yData={[100, 200, 300]}
        style={{ width: 500, height: 500 }} />
    </div>
  )
};

export default Home;