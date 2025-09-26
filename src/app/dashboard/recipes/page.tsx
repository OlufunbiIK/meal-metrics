"use client";
import DashboardLayout from "@/app/layout/DashboardLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VegetableSaladRecipe() {
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();

  const relatedRecipes = [
    {
      id: 1,
      title: "Beef Tacos with Salsa",
      time: "25 mins",
      rating: 3,
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
    },
    {
      id: 2,
      title: "Beef Tacos with Salsa",
      time: "25 mins",
      rating: 3,
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
    },
    {
      id: 3,
      title: "Beef Tacos with Salsa",
      time: "25 mins",
      rating: 3,
      image: "/images/789313d3a5b1206893a14d90ccc4fe15f75a8d3e.png",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Joshua A.",
      date: "August 24, 2024 | 4:40PM",
      rating: 3,
      comment:
        "This vegetable salad is a perfect blend of flavors and textures! The dressing is light but enhances the natural taste of the veggies. Will definitely make this again!",
    },
    {
      id: 2,
      name: "Joshua A.",
      date: "August 24, 2024 | 4:40PM",
      rating: 3,
      comment:
        "This vegetable salad is a perfect blend of flavors and textures! The dressing is light but enhances the natural taste of the veggies. Will definitely make this again!",
    },
    {
      id: 3,
      name: "Joshua A.",
      date: "August 24, 2024 | 4:40PM",
      rating: 3,
      comment:
        "This vegetable salad is a perfect blend of flavors and textures! The dressing is light but enhances the natural taste of the veggies. Will definitely make this again!",
    },
    {
      id: 4,
      name: "Joshua A.",
      date: "August 24, 2024 | 4:40PM",
      rating: 3,
      comment:
        "This vegetable salad is a perfect blend of flavors and textures! The dressing is light but enhances the natural taste of the veggies. Will definitely make this again!",
    },
  ];

  const ingredients = [
    "1 head of lettuce, chopped",
    "2 tomatoes, sliced",
    "1 cucumber, sliced",
    "1 carrot, grated",
    "1 red bell pepper, sliced",
    "1/2 cup sweet corn",
    "1/4 cup raisins",
    "2 tablespoons olive oil",
    "1 tablespoon lemon juice",
    "1 tablespoon lemon juice",
  ];

  const instructions = [
    "In a large bowl, combine the lettuce, tomatoes, cucumber, carrot, and bell peppers",
    "Add the sweet corn and raisins, mixing well",
    "In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper",
    "Pour the dressing over the salad and toss gently to coat all the vegetables evenly",
    "Serve immediately or chill for a refreshing cold salad",
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };
  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };

  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative mb-6">
                <img
                  src="/images/7f5252a6396a178b4b0daaeddf39d5394b03b027.png"
                  alt="Vegetable Salad"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              </div>

              {/* Title and Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <h1 className="text-[22px] md:text-3xl font-bold text-[#333333]">
                    Vegetable Salad
                  </h1>
                  <div className="flex items-center gap-2 bg-[#00808033] px-3 py-1 rounded-full">
                    <img src="/images/carbon_time.png" alt="clock" />
                    <span className="text-[14px] text-[#008080]">25 mins</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/dashboard/favorites")}
                  className="bg-[#008080] text-white px-6 py-3 text-[12px] rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add to Favorites
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-[#EAECF0] mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "description"
                        ? "border-[#008080] text-[#008080]"
                        : "border-transparent text-[#576275] hover:text-gray-700"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("instruction")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "instruction"
                        ? "border-[#008080] text-[#008080]"
                        : "border-transparent text-[#576275] hover:text-gray-700"
                    }`}
                  >
                    Instruction
                  </button>
                  <button
                    onClick={() => setActiveTab("rating")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "rating"
                        ? "border-[#008080] text-[#008080]"
                        : "border-transparent text-[#576275] hover:text-gray-700"
                    }`}
                  >
                    Rating & Review
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg text-[#0A0B0B] font-semibold mb-3 flex items-center gap-2">
                        <img
                          src="/images/material-symbols_description (2).svg"
                          alt="Description"
                        />
                        Description
                      </h2>
                      <p className="text-[#343434] text-[16px] leading-relaxed">
                        This vibrant vegetable salad is a refreshing mix of
                        crisp lettuce, juicy tomatoes, crunchy cucumbers, and
                        colorful bell peppers, topped with sweet corn and
                        raisins. Tossed in a light olive oil and lemon juice
                        dressing, it's the perfect side dish or light meal for
                        any occasion.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-[#0A0B0B] mb-3 flex items-center gap-2">
                        <img src="/images/Vector (1).png" alt="Ingredients" />
                        Ingredients
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="bg-[#0080801A] px-3 py-2 rounded-[20px] text-sm text-[#008080] text-center"
                          >
                            {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[18px] text-[#0A0B0B]">
                        <img src="/images/icon-park-solid_cooking.svg" alt="" />
                        Nutrition Information
                      </h2>
                      <div className="bg-[#0384DC0D] rounded-lg p-4 space-y-4 border-[1px] border-[#0384DC]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#0384DC] rounded-full"></span>
                          <span className="text-[16px] text-black">
                            Calories: 150 per serving
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#0384DC] rounded-full"></span>
                          <span className="text-[16px] text-black">
                            Carbohydrates: 20g
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#0384DC] rounded-full"></span>
                          <span className="text-[16px] text-black">
                            Protein: 2g
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#0384DC] rounded-full"></span>
                          <span className="text-[16px] text-black">
                            Fat: 7g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "instruction" && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#0A0B0B] mb-4 flex items-center gap-2">
                      <img
                        src="/images/solar_chef-hat-bold.png"
                        alt="nutrition"
                      />
                      Nutrition Information
                    </h2>
                    <div className="bg-[#0080800D] border-[1px] border-[#008080] rounded-lg p-4 space-y-5">
                      {instructions.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-[#008080] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-[#000000] text-[16px]">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "rating" && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#0A0B0B] mb-4">
                      Reviews
                    </h2>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-[#F7F9FC] rounded-[32px] bg-[#F7F9FC] px-4 py-4 lg:px-8 md:py-8 pb-4 last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                              <img
                                src="/images/Front view man having fun at festival.png"
                                alt="image"
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-[16px] text-[#344054]">
                                  {review.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-xs text-[#667185] text-[14px] mb-2">
                                {review.date}
                              </p>
                              <p className="text-sm text-[#000000] text-[16px] leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recipe Maker */}
              <div className="bg-white rounded-lg p-3 shadow-sm text-center flex flex-col justify-center items-center gap-2">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4">
                  <img src="/images/Frame 1618869004.png" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Michelle Obama
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Recipe Maker</p>
                </div>
                <button className="flex flex-row items-center justify-center gap-2 border w-[96px] border-[#008080] text-[#008080] px-4 py-2 text-[12px] rounded-lg hover:bg-teal-50 transition-colors">
                  <img src="/images/hugeicons_mail-02.png" alt="contact" />
                  Contact
                </button>
              </div>

              {/* Related Recipes */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Related Recipes
                  </h3>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="text-sm text-teal-600 hover:text-teal-700"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-6">
                  {relatedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="group cursor-pointer transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg -m-3"
                    >
                      <div className="flex flex-col gap-3">
                        {/* Image */}
                        <div className="w-full">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-40 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-gray-900">
                            {recipe.title}
                          </h4>

                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                              <img
                                src="/images/carbon_time.png"
                                alt="Time"
                                className="w-3 h-3 opacity-70"
                              />
                              {recipe.time}
                            </span>

                            <div className="flex items-center gap-0.5">
                              {renderStars(recipe.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
