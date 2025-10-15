// tests/hydrationGoalsRepository.test.js
import {
  addHydrationGoalRepository,
  deleteHydrationGoalRepository,
  getHydrationGoalRepository,
  updateHydrationGoalRepository,
} from "../../Repositories/hydration_goals.Repository.js";

import hydration_goals from "../../Models/hydration_goals.Model.js";

// Mock Sequelize model
jest.mock("../../Models/hydration_goals.Model.js", () => ({
  create: jest.fn(),
  destroy: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
}));

describe("Hydration Goals Repository", () => {
  const mockGoal = {
    id: 1,
    user_id: "123e4567-e89b-12d3-a456-426614174000",
    goalMl: 2500,
    startDate: new Date(),
    endDate: null,
    user_age: new Date("2000-01-01"),
    gender: "male",
    activity_level: "active",
    climate: "hot",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 🧪 TEST 1: Add hydration goal
  it("should add a new hydration goal", async () => {
    hydration_goals.create.mockResolvedValue(mockGoal);

    const result = await addHydrationGoalRepository(mockGoal);

    expect(hydration_goals.create).toHaveBeenCalledWith(mockGoal);
    expect(result).toEqual(mockGoal);
  });

  // 🧪 TEST 2: Get hydration goals
  it("should return all hydration goals for a user", async () => {
    hydration_goals.findAll.mockResolvedValue([mockGoal]);

    const result = await getHydrationGoalRepository(mockGoal.user_id);

    expect(hydration_goals.findAll).toHaveBeenCalledWith({
      where: { user_id: mockGoal.user_id },
    });
    expect(result).toEqual([mockGoal]);
  });

  // 🧪 TEST 3: Update hydration goal
  it("should update an existing hydration goal", async () => {
    const updates = { goalMl: 3000 };
    hydration_goals.update.mockResolvedValue([1]);
    hydration_goals.findOne.mockResolvedValue({ ...mockGoal, ...updates });

    const result = await updateHydrationGoalRepository(mockGoal.user_id, mockGoal.id, updates);

    expect(hydration_goals.update).toHaveBeenCalledWith(updates, {
      where: { user_id: mockGoal.user_id, id: mockGoal.id },
    });
    expect(result.goalMl).toBe(3000);
  });

  // 🧪 TEST 4: Delete hydration goal
  it("should delete a hydration goal successfully", async () => {
    hydration_goals.destroy.mockResolvedValue(1);

    const result = await deleteHydrationGoalRepository(mockGoal.user_id, mockGoal.id);

    expect(hydration_goals.destroy).toHaveBeenCalledWith({
      where: { user_id: mockGoal.user_id, id: mockGoal.id },
    });
    expect(result).toBe(1);
  });

  // 🧪 TEST 5: Throw error if deleting non-existent goal
  it("should throw error when deleting a non-existent goal", async () => {
    hydration_goals.destroy.mockResolvedValue(0);

    await expect(
      deleteHydrationGoalRepository(mockGoal.user_id, 999)
    ).rejects.toThrow("Hydration goal not found");
  });
});
