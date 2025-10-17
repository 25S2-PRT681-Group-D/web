import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  const features = [
    {
      icon: "🔍",
      title: "Plant Health Analysis",
      description: "Get accurate plant health diagnoses with 95% accuracy"
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Simply take a photo and get instant results with detailed recommendations"
    },
    {
      icon: "📊",
      title: "Health Tracking",
      description: "Monitor your plant health over time with detailed reports"
    },
    {
      icon: "🌱",
      title: "Plant Database",
      description: "Supports 50+ plant species including vegetables, fruits, and ornamental plants"
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-savannagreen/20 via-arafurablue/10 to-territoryochre/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-charcoalgrey leading-tight">
                  Plant
                  <span className="block text-savannagreen">Health Analysis</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Monitor your plant health with our analysis platform.
                  Get instant, accurate diagnoses and recommendations for healthier crops.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/new-inspection"
                      className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3"
                    >
                      <span>📸</span>
                      Start Analysis
                    </Link>
                    <Link
                      to="/my-records"
                      className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-3"
                    >
                      <span>📊</span>
                      View Records
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth"
                      className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3"
                    >
                      <span>🚀</span>
                      Get Started
                    </Link>
                    <Link
                      to="/auth"
                      className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-3"
                    >
                      <span>📱</span>
                      Learn More
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Automated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Health Recommendations</span>
                </div>
              </div>
            </div>

            <div className="relative w-full flex justify-center items-center">
              <div className="bg-white w-full lg:w-2/3 rounded-2xl shadow-2xl p-6 border border-gray-100">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-savannagreen to-arafurablue rounded-full flex items-center justify-center">
                      <span className="text-lg">🌱</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoalgrey">AgroScan Dashboard</h3>
                      <p className="text-xs text-gray-500">Live Analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Online</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">📊</span>
                      <span className="text-xs font-medium text-green-700">Today's Scans</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">47</div>
                    <div className="text-xs text-green-600">+12% from yesterday</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600">🎯</span>
                      <span className="text-xs font-medium text-blue-700">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">95.2%</div>
                    <div className="text-xs text-blue-600">AI Confidence</div>
                  </div>
                </div>

                {/* Recent Analysis Results */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-charcoalgrey mb-3">Recent Analysis</h4>

                  <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-800">Tomato Plant</div>
                          <div className="text-xs text-green-600">Healthy - 98% confidence</div>
                        </div>
                      </div>
                      <div className="text-xs text-green-600">2m ago</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 text-xs">⚠</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-yellow-800">Corn Plant</div>
                          <div className="text-xs text-yellow-600">Early Blight - 87% confidence</div>
                        </div>
                      </div>
                      <div className="text-xs text-yellow-600">5m ago</div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-xs">⚠</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-red-800">Wheat Plant</div>
                          <div className="text-xs text-red-600">Disease Detected - 92% confidence</div>
                        </div>
                      </div>
                      <div className="text-xs text-red-600">8m ago</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-savannagreen to-arafurablue text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <span>📸</span>
                    <span>Start New Scan</span>
                  </button>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                      View History
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                      Analytics
                    </button>
                  </div>
                </div>

                {/* Live Activity Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Live monitoring active</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Team photos collage */}
            <div className="relative">
              <div className="w-120 h-120 mx-auto relative">
                {/* Main circular container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-savannagreen/20 to-arafurablue/20 p-4">
                  <div className="w-full h-full rounded-full bg-white shadow-2xl grid grid-cols-2 gap-2 p-4">
                    {/* Top left - AI/Technology */}
                    <div className="bg-gradient-to-br from-arafurablue/20 to-territoryochre/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🤖</div>
                        <div className="text-xl font-semibold text-charcoalgrey">AI Technology</div>
                      </div>
                    </div>
                    {/* Top right - Agriculture */}
                    <div className="bg-gradient-to-br from-savannagreen/20 to-acaciagold/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🌱</div>
                        <div className="text-xl font-semibold text-charcoalgrey">Agriculture</div>
                      </div>
                    </div>
                    {/* Bottom left - Analytics */}
                    <div className="bg-gradient-to-br from-territoryochre/20 to-savannagreen/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div className="text-xl font-semibold text-charcoalgrey">Analytics</div>
                      </div>
                    </div>
                    {/* Bottom right - Innovation */}
                    <div className="bg-gradient-to-br from-acaciagold/20 to-arafurablue/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">💡</div>
                        <div className="text-xl font-semibold text-charcoalgrey">Innovation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                WHO ARE WE?
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-charcoalgrey leading-tight">
                WE NARRATE THE DISTINCTIVE & STORIES SOME BRAND WITH SHAPING THEIR TARGET.
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AgroScan is a passionate, driven and attentive team offering plant health analysis, health recommendations, and agricultural technology to help farmers optimize their crop yields.
                </p>
                <p>
                  Our dedicated team combines agricultural expertise with technology to provide accurate plant health diagnoses, helping farmers make informed decisions for healthier, more productive crops.
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.href = '/dashboard'
                }}
                className="w-16 h-16 bg-white border-2 border-savannagreen rounded-full flex items-center justify-center hover:bg-savannagreen hover:text-white transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoalgrey mb-6">
              Why Choose AgroScan?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines technology with agricultural expertise
              to provide accurate plant health analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-savannagreen/20 to-arafurablue/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-charcoalgrey mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-7xl font-bold text-charcoalgrey mb-8">
              SERVICES
            </h2>

            {/* Service categories */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">PLANT ANALYSIS</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">HEALTH MONITORING</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">HEALTH RECOMMENDATIONS</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">ANALYTICS DASHBOARD</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">CROP OPTIMISATION</span>
            </div>
          </div>

          {/* Services List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0">
              {/* Service 1 */}
              <div className="flex items-center py-8 border-b border-gray-200">
                <div className="w-16 text-2xl text-gray-400 font-bold">01</div>
                <div className="flex-1 px-8">
                  <h3 className="text-2xl font-bold text-charcoalgrey mb-2">PLANT ANALYSIS</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Analyze plant health with 95% accuracy,
                    providing instant diagnoses for diseases, pests, and nutrient deficiencies.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-center py-8 border-b border-gray-200">
                <div className="w-16 text-2xl text-gray-400 font-bold">02</div>
                <div className="flex-1 px-8">
                  <h3 className="text-2xl font-bold text-charcoalgrey mb-2">HEALTH MONITORING</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Continuous monitoring of plant health over time with detailed tracking,
                    alerts, and detailed health reports for optimal crop management.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex items-center py-8 border-b border-gray-200">
                <div className="w-16 text-2xl text-gray-400 font-bold">03</div>
                <div className="flex-1 px-8">
                  <h3 className="text-2xl font-bold text-charcoalgrey mb-2">HEALTH RECOMMENDATIONS</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Recommendations for treatment, prevention, and optimization
                    based on agricultural best practices and scientific research.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex items-center py-8 border-b border-gray-200">
                <div className="w-16 text-2xl text-gray-400 font-bold">04</div>
                <div className="flex-1 px-8">
                  <h3 className="text-2xl font-bold text-charcoalgrey mb-2">ANALYTICS DASHBOARD</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Analytics and insights with visual charts, trends analysis,
                    and performance metrics to optimize your agricultural operations.
                  </p>
                </div>
              </div>

              {/* Service 5 */}
              <div className="flex items-center py-8">
                <div className="w-16 text-2xl text-gray-400 font-bold">05</div>
                <div className="flex-1 px-8">
                  <h3 className="text-2xl font-bold text-charcoalgrey mb-2">CROP OPTIMISATION</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Data-driven insights for maximizing yield, reducing waste, and improving
                    overall farm productivity through crop management strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-7xl font-bold text-charcoalgrey mb-8">
              OUR TEAM
            </h2>

            {/* Team categories */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">CREATIVE</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">TEAM</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">PRODUCTIVE</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">CREATIVE</span>
              <span className="text-lg text-charcoalgrey font-medium hover:text-savannagreen transition-colors cursor-pointer">SKILLED</span>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center group">
              <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-arafurablue/20 to-territoryochre/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-arafurablue to-territoryochre rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <div className="text-lg font-semibold text-charcoalgrey">Full Stack Developer</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoalgrey mb-2">Mr. Howard Mai</h3>
              <p className="text-gray-600 font-medium">FULL STACK DEVELOPER</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group">
              <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-savannagreen/20 to-acaciagold/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-savannagreen to-acaciagold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <div className="text-lg font-semibold text-charcoalgrey">Backend Developer</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoalgrey mb-2">Mr. Ritiz Karkee</h3>
              <p className="text-gray-600 font-medium">BACKEND DEVELOPER</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center group">
              <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-territoryochre/20 to-savannagreen/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-territoryochre to-savannagreen rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📊</span>
                  </div>
                  <div className="text-lg font-semibold text-charcoalgrey">Business Analyst</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoalgrey mb-2">Mr. Nolan Kieu</h3>
              <p className="text-gray-600 font-medium">BUSINESS ANALYST</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center group">
              <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-acaciagold/20 to-arafurablue/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-acaciagold to-arafurablue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👩‍💻</span>
                  </div>
                  <div className="text-lg font-semibold text-charcoalgrey">Tester</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoalgrey mb-2">Ms. Musrat Jahan</h3>
              <p className="text-gray-600 font-medium">TESTER</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoalgrey to-savannagreen text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Agriculture?
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join thousands of farmers and agricultural workers who trust AgroScan
              for accurate plant health analysis and health recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/new-inspection"
                  className="bg-white text-charcoalgrey font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Start Your First Analysis
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="bg-white text-charcoalgrey font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Get Started Today
                </Link>
              )}
              <Link
                to="/my-records"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-charcoalgrey transition-colors duration-300"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
